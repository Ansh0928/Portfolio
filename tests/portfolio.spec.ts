import { test, expect } from "@playwright/test";

test.describe("Portfolio — critical path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page title is correct", async ({ page }) => {
    await expect(page).toHaveTitle(/Anshumaan Saraf/);
  });

  test("hero shows name and CTAs", async ({ page }) => {
    await expect(page.getByText("ANSHUMAAN SARAF").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /View Work/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Let.s Talk/i })).toBeVisible();
  });

  test("stats bar shows key metrics", async ({ page }) => {
    const statsBar = page.getByLabel("Key metrics");
    await expect(statsBar.getByText("$300k+")).toBeVisible();
    await expect(statsBar.getByText("$26k+")).toBeVisible();
    await expect(statsBar.getByText("5 days")).toBeVisible();
  });

  test("work section has case study", async ({ page }) => {
    await page.getByRole("link", { name: /View Work/i }).click();
    const workSection = page.locator("#work");
    await expect(
      workSection.getByRole("heading", { name: "Tasman Star Seafood" }),
    ).toBeVisible();
  });

  test("contact section is reachable", async ({ page }) => {
    await page.getByRole("link", { name: /Let.s Talk/i }).click();
    await expect(
      page.getByText("Got a problem that costs time or money?"),
    ).toBeVisible();
  });

  test("404 page renders", async ({ page }) => {
    await page.goto("/nonexistent-page");
    await expect(page.getByText("404")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Back to portfolio/i }),
    ).toBeVisible();
  });
});
