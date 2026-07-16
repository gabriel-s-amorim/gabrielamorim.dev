/**
 * Captura screenshots + vídeo do fluxo Nativa Store.
 *
 * Env:
 *   NATIVA_URL          (default: https://nativa-store.vercel.app)
 *   NATIVA_OUT_DIR      (default: ../nativa-store/nativa-store/docs/screenshots ou docs/screenshots/nativa-store)
 *   NATIVA_ADMIN_PASSWORD  — senha do painel admin (não hardcode)
 *
 * Uso:
 *   pnpm capture:nativa-store
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
  if (process.env.NATIVA_OUT_DIR) return path.resolve(process.env.NATIVA_OUT_DIR);

  const sibling = path.resolve(
    ROOT,
    "..",
    "nativa-store",
    "nativa-store",
    "docs",
    "screenshots"
  );
  if (existsSync(path.dirname(sibling))) return sibling;

  return path.join(ROOT, "docs", "screenshots", "nativa-store");
}

async function main() {
  await loadCaptureEnv(ROOT);
  const baseURL = process.env.NATIVA_URL ?? "https://nativa-store.vercel.app";
  const outDir = resolveOutDir();
  const adminPassword = process.env.NATIVA_ADMIN_PASSWORD;

  console.log(`\n▶ Nativa Store capture`);
  console.log(`  URL: ${baseURL}`);
  console.log(`  Out: ${outDir}\n`);

  const ctx = await startCapture({
    baseURL,
    outDir,
    videoName: "nativa-store-demo",
  });
  const { page } = ctx;

  try {
    // 1) Home
    await page.goto(`${ctx.baseURL}/`, { waitUntil: "domcontentloaded" });
    await settle(page, 1200);
    await shot(page, outDir, "01-home");

    // 2) Produto
    const productLink = page.locator('a[href^="/produto/"]').first();
    await productLink.waitFor({ state: "visible", timeout: 20_000 });
    await productLink.click();
    await settle(page, 1000);
    await shot(page, outDir, "02-produto");

    // 3) Adicionar ao carrinho → página carrinho
    const addBtn = page.getByRole("button", { name: /Adicionar ao [Cc]arrinho/i }).first();
    await addBtn.waitFor({ state: "visible", timeout: 15_000 });
    await addBtn.click();
    await settle(page, 800);

    const cartFull = page.locator('a[href="/carrinho"]').first();
    if (await cartFull.isVisible().catch(() => false)) {
      await cartFull.click();
    } else {
      await page.goto(`${ctx.baseURL}/carrinho`, { waitUntil: "domcontentloaded" });
    }
    await settle(page, 1000);
    await shot(page, outDir, "03-carrinho");

    // 4) Checkout
    const checkoutLink = page.locator('a[href="/checkout"]').first();
    if (await checkoutLink.isVisible().catch(() => false)) {
      await checkoutLink.click();
    } else {
      await page.goto(`${ctx.baseURL}/checkout`, { waitUntil: "domcontentloaded" });
    }
    await settle(page, 1200);
    await shot(page, outDir, "04-checkout");

    // 5) Admin
    await page.goto(`${ctx.baseURL}/admin/login`, { waitUntil: "domcontentloaded" });
    await settle(page, 800);
    await shot(page, outDir, "05-admin-login");

    if (adminPassword) {
      await page.locator("#admin-password").fill(adminPassword);
      await page.getByRole("button", { name: /Entrar no painel/i }).click();
      await page.waitForURL(/\/admin(\/|$)/, { timeout: 20_000 }).catch(() => undefined);
      await settle(page, 1500);
      await shot(page, outDir, "06-admin-dashboard");
    } else {
      console.warn(
        "  ⚠ NATIVA_ADMIN_PASSWORD não definido — pulando login admin (só screenshot da tela de login)."
      );
    }
  } catch (error) {
    console.error("\n✖ Falha no fluxo Nativa Store:", error);
    await shot(page, outDir, "99-error-state").catch(() => undefined);
    await finishCapture(ctx, "nativa-store-demo").catch(() => undefined);
    process.exitCode = 1;
    return;
  }

  const media = await finishCapture(ctx, "nativa-store-demo");
  await syncToPortfolioPublic({
    slug: "nativa-store",
    coverSource: path.join(outDir, "01-home.png"),
    mp4Source: media.mp4,
    gifSource: media.gif,
  });
  console.log("\n✔ Captura Nativa Store concluída.\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
