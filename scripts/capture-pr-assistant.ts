/**
 * Captura screenshots + vídeo da landing do PR Assistant.
 *
 * Env:
 *   PR_ASSISTANT_URL      (default: https://pr-reviewer-ai-zeta.vercel.app)
 *   PR_ASSISTANT_OUT_DIR  (default: docs/screenshots/pr-assistant)
 *
 * Uso:
 *   pnpm capture:pr-assistant
 */
import path from "node:path";
import { existsSync } from "node:fs";
import { copyFile } from "node:fs/promises";
import {
  ensureDir,
  finishCapture,
  loadCaptureEnv,
  settle,
  shot,
  startCapture,
  syncToPortfolioPublic,
} from "./capture/shared";

const ROOT = process.cwd();

function resolveOutDir(): string {
  if (process.env.PR_ASSISTANT_OUT_DIR) {
    return path.resolve(process.env.PR_ASSISTANT_OUT_DIR);
  }
  return path.join(ROOT, "docs", "screenshots", "pr-assistant");
}

async function main() {
  await loadCaptureEnv(ROOT);
  const baseURL =
    process.env.PR_ASSISTANT_URL ?? "https://pr-reviewer-ai-zeta.vercel.app";
  const outDir = resolveOutDir();

  console.log(`\n▶ PR Assistant capture`);
  console.log(`  URL: ${baseURL}`);
  console.log(`  Out: ${outDir}\n`);

  const ctx = await startCapture({
    baseURL,
    outDir,
    videoName: "pr-assistant-demo",
  });
  const { page } = ctx;

  try {
    await page.goto(`${ctx.baseURL}/`, { waitUntil: "domcontentloaded" });
    await settle(page, 1200);
    await shot(page, outDir, "01-hero");

    const comoFunciona = page.locator("#como-funciona");
    if (await comoFunciona.count()) {
      await comoFunciona.scrollIntoViewIfNeeded();
      await settle(page, 700);
      await shot(page, outDir, "02-fluxo");
    }

    const resultado = page.locator("#resultado-real");
    if (await resultado.count()) {
      await resultado.scrollIntoViewIfNeeded();
      await settle(page, 900);
      await shot(page, outDir, "03-evidencia");

      const commentFigure = resultado.locator("figure").nth(1);
      if (await commentFigure.count()) {
        await commentFigure.scrollIntoViewIfNeeded();
        await settle(page, 600);
        await shot(page, outDir, "04-comentario");
      }
    }

    const produto = page.getByRole("heading", {
      name: /Feito como produto real/i,
    });
    if (await produto.isVisible().catch(() => false)) {
      await produto.scrollIntoViewIfNeeded();
      await settle(page, 600);
      await shot(page, outDir, "05-produto");
    }

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await settle(page, 800);
  } finally {
    const media = await finishCapture(ctx, "pr-assistant-demo");

    await syncToPortfolioPublic({
      slug: "pr-assistant",
      coverSource: path.join(outDir, "01-hero.png"),
      mp4Source: media.mp4,
      gifSource: media.gif,
    });

    // Galeria no public/projects
    const galleryDir = path.join(
      ROOT,
      "public",
      "projects",
      "pr-assistant",
      "gallery",
    );
    await ensureDir(galleryDir);

    const galleryMap: Array<[string, string]> = [
      ["01-hero.png", "01-hero.png"],
      ["02-fluxo.png", "02-fluxo.png"],
      ["03-evidencia.png", "03-evidencia.png"],
      ["04-comentario.png", "04-comentario.png"],
      ["05-produto.png", "05-produto.png"],
    ];

    for (const [srcName, destName] of galleryMap) {
      const src = path.join(outDir, srcName);
      if (existsSync(src)) {
        await copyFile(src, path.join(galleryDir, destName));
        console.log(`  ✓ gallery → ${destName}`);
      }
    }

    // Também traz o comentário real do bot (asset do repo pr-reviewer-ai) se existir
    const botShot = path.resolve(
      ROOT,
      "..",
      "pr-reviewer-ai",
      "docs",
      "screenshots",
      "pr-review-2026-07-18.png",
    );
    if (existsSync(botShot)) {
      await copyFile(botShot, path.join(galleryDir, "06-bot-review.png"));
      console.log("  ✓ gallery → 06-bot-review.png");
    }

    console.log("\n✔ Captura PR Assistant concluída.\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
