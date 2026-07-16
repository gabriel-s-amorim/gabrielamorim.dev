/**
 * Captura screenshots + vídeo do fluxo DevLevel (habito-angular).
 *
 * Env:
 *   DEVLEVEL_URL       (default: https://habito-angular.vercel.app)
 *   DEVLEVEL_OUT_DIR   (default: ../habito-angular/docs/screenshots ou docs/screenshots/devlevel)
 *   DEVLEVEL_EMAIL     (default: demo@devlevel.app)
 *   DEVLEVEL_PASSWORD  (default: demo1234 — só para demo; sobrescreva em produção)
 *
 * Uso:
 *   pnpm capture:devlevel
 */
import path from "node:path";
import { existsSync } from "node:fs";
import {
  finishCapture,
  loadCaptureEnv,
  settle,
  shot,
  startCapture,
  syncToPortfolioPublic,
} from "./capture/shared";

const ROOT = process.cwd();

function resolveOutDir(): string {
  if (process.env.DEVLEVEL_OUT_DIR) return path.resolve(process.env.DEVLEVEL_OUT_DIR);

  const sibling = path.resolve(ROOT, "..", "habito-angular", "docs", "screenshots");
  if (existsSync(path.dirname(path.dirname(sibling)))) return sibling;

  return path.join(ROOT, "docs", "screenshots", "devlevel");
}

async function main() {
  await loadCaptureEnv(ROOT);
  const baseURL = process.env.DEVLEVEL_URL ?? "https://habito-angular.vercel.app";
  const outDir = resolveOutDir();
  const email = process.env.DEVLEVEL_EMAIL ?? "demo@devlevel.app";
  const password = process.env.DEVLEVEL_PASSWORD ?? "demo1234";

  console.log(`\n▶ DevLevel capture`);
  console.log(`  URL: ${baseURL}`);
  console.log(`  Out: ${outDir}\n`);

  const ctx = await startCapture({
    baseURL,
    outDir,
    videoName: "devlevel-demo",
  });
  const { page } = ctx;

  try {
    // 1) Landing
    await page.goto(`${ctx.baseURL}/`, { waitUntil: "domcontentloaded" });
    await settle(page, 1000);
    await shot(page, outDir, "01-landing");

    // 2) Login
    await page.goto(`${ctx.baseURL}/login`, { waitUntil: "domcontentloaded" });
    await settle(page, 800);
    // Labels no DevLevel não usam htmlFor — selecionar pelo tipo do input.
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').fill(password);
    await shot(page, outDir, "02-login");
    await page.getByRole("button", { name: /Entrar/i }).click();
    await page.waitForURL(/\/dashboard/, { timeout: 25_000 });
    await settle(page, 1500);

    // 3) Dashboard (+ gráficos)
    await shot(page, outDir, "03-dashboard");

    // Scroll leve para enquadrar charts se existirem
    const chartsHeading = page.getByText(/Pontos por semana|Autonomia/i).first();
    if (await chartsHeading.isVisible().catch(() => false)) {
      await chartsHeading.scrollIntoViewIfNeeded();
      await settle(page, 600);
      await shot(page, outDir, "04-dashboard-charts");
    }

    // 4) Criar entry
    await page.goto(`${ctx.baseURL}/entries`, { waitUntil: "domcontentloaded" });
    await settle(page, 800);
    await shot(page, outDir, "05-entries");

    const nova = page.getByRole("button", { name: /Nova entrada/i });
    if (await nova.isVisible().catch(() => false)) {
      await nova.click();
      await settle(page, 500);

      const textareas = page.locator("textarea");
      const count = await textareas.count();
      if (count > 0) {
        await textareas.nth(0).fill("Entrada gerada pela captura Playwright do portfólio.");
      }
      if (count > 1) {
        await textareas.nth(1).fill("Automação de demos sem screenshots manuais.");
      }

      const salvar = page.getByRole("button", { name: /Salvar entrada/i });
      if (await salvar.isVisible().catch(() => false)) {
        await salvar.click();
        await settle(page, 1200);
      }
      await shot(page, outDir, "06-entry-created");
    }

    // 5) Reflection
    await page.goto(`${ctx.baseURL}/reflection`, { waitUntil: "domcontentloaded" });
    await settle(page, 1000);
    await shot(page, outDir, "07-reflection");
  } catch (error) {
    console.error("\n✖ Falha no fluxo DevLevel:", error);
    await shot(page, outDir, "99-error-state").catch(() => undefined);
    await finishCapture(ctx, "devlevel-demo").catch(() => undefined);
    process.exitCode = 1;
    return;
  }

  const media = await finishCapture(ctx, "devlevel-demo");
  await syncToPortfolioPublic({
    slug: "devlevel",
    coverSource: path.join(outDir, "03-dashboard.png"),
    mp4Source: media.mp4,
    gifSource: media.gif,
  });
  console.log("\n✔ Captura DevLevel concluída.\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
