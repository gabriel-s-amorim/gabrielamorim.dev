import { mkdir, readdir, rename, unlink, readFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import { chromium, type Browser, type Page } from "playwright";

const execFileAsync = promisify(execFile);

/** Carrega KEY=VALUE de .env.capture.local sem sobrescrever o que já está no process.env. */
export async function loadCaptureEnv(cwd = process.cwd()) {
  const file = path.join(cwd, ".env.capture.local");
  if (!existsSync(file)) return;
  const text = await readFile(file, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

export interface CaptureContext {
  browser: Browser;
  page: Page;
  outDir: string;
  videoDir: string;
  baseURL: string;
}

export function env(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(
      `Variável de ambiente obrigatória ausente: ${name}. Defina no shell ou em .env.capture.local`
    );
  }
  return value;
}

export async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

export async function startCapture(options: {
  baseURL: string;
  outDir: string;
  videoName: string;
}): Promise<CaptureContext> {
  await ensureDir(options.outDir);
  const videoDir = path.join(options.outDir, ".video-tmp");
  await ensureDir(videoDir);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    recordVideo: {
      dir: videoDir,
      size: { width: 1440, height: 900 },
    },
  });

  const page = await context.newPage();
  page.setDefaultTimeout(45_000);

  return {
    browser,
    page,
    outDir: options.outDir,
    videoDir,
    baseURL: options.baseURL.replace(/\/$/, ""),
  };
}

export async function shot(page: Page, outDir: string, name: string) {
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log(`  ✓ screenshot → ${file}`);
}

export async function finishCapture(
  ctx: CaptureContext,
  videoBaseName: string
): Promise<{ webm: string; mp4?: string; gif?: string }> {
  const video = ctx.page.video();
  await ctx.page.context().close();
  await ctx.browser.close();

  const webmPath = path.join(ctx.outDir, `${videoBaseName}.webm`);
  if (video) {
    const tmpPath = await video.path();
    await rename(tmpPath, webmPath);
    console.log(`  ✓ vídeo → ${webmPath}`);
  } else {
    throw new Error("Playwright não gerou arquivo de vídeo.");
  }

  // limpa restos do diretório temporário
  try {
    const leftovers = await readdir(ctx.videoDir);
    await Promise.all(
      leftovers.map((f) => unlink(path.join(ctx.videoDir, f)).catch(() => undefined))
    );
  } catch {
    /* ignore */
  }

  const mp4Path = path.join(ctx.outDir, `${videoBaseName}.mp4`);
  const gifPath = path.join(ctx.outDir, "demo.gif");
  const result: { webm: string; mp4?: string; gif?: string } = { webm: webmPath };

  const ffmpegBin = await hasFfmpeg();
  if (ffmpegBin) {
    try {
      await execFileAsync(ffmpegBin, [
        "-y",
        "-i",
        webmPath,
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        mp4Path,
      ]);
      result.mp4 = mp4Path;
      console.log(`  ✓ mp4 → ${mp4Path}`);
    } catch (error) {
      console.warn("  ⚠ falha ao converter para mp4:", (error as Error).message);
    }

    try {
      // GIF otimizado: ~12s, resolução reduzida, loop
      await execFileAsync(ffmpegBin, [
        "-y",
        "-i",
        webmPath,
        "-t",
        "12",
        "-vf",
        "fps=10,scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer",
        "-loop",
        "0",
        gifPath,
      ]);
      result.gif = gifPath;
      console.log(`  ✓ gif → ${gifPath}`);
    } catch (error) {
      console.warn("  ⚠ falha ao gerar gif:", (error as Error).message);
    }
  } else {
    console.warn(
      "  ⚠ ffmpeg não encontrado — mantendo .webm. Instale ffmpeg (ou defina FFMPEG_PATH) para gerar .mp4 e demo.gif."
    );
  }

  return result;
}

function resolveFfmpegBin(): string | null {
  if (process.env.FFMPEG_PATH && existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  return "ffmpeg";
}

async function hasFfmpeg(): Promise<string | null> {
  const bin = resolveFfmpegBin();
  if (!bin) return null;
  try {
    await execFileAsync(bin, ["-version"]);
    return bin;
  } catch {
    return null;
  }
}

export async function settle(page: Page, ms = 800) {
  await page.waitForLoadState("networkidle").catch(() => undefined);
  await page.waitForTimeout(ms);
}

/**
 * Copia mídia gerada para `public/projects/<slug>/` do portfólio,
 * para aparecer nos cards do site.
 */
export async function syncToPortfolioPublic(options: {
  slug: string;
  coverSource: string;
  mp4Source?: string;
  gifSource?: string;
  portfolioRoot?: string;
}) {
  const root = options.portfolioRoot ?? process.cwd();
  const destDir = path.join(root, "public", "projects", options.slug);
  await ensureDir(destDir);

  if (existsSync(options.coverSource)) {
    const dest = path.join(destDir, "cover.png");
    await copyFile(options.coverSource, dest);
    console.log(`  ✓ site cover → ${dest}`);
  }

  if (options.mp4Source && existsSync(options.mp4Source)) {
    const dest = path.join(destDir, "demo.mp4");
    await copyFile(options.mp4Source, dest);
    console.log(`  ✓ site video → ${dest}`);
  }

  if (options.gifSource && existsSync(options.gifSource)) {
    const dest = path.join(destDir, "demo.gif");
    await copyFile(options.gifSource, dest);
    console.log(`  ✓ site gif → ${dest}`);
  }
}
