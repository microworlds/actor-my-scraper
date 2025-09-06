import { createPlaywrightRouter } from "crawlee";

export const router = createPlaywrightRouter();

router.addDefaultHandler(async ({ enqueueLinks, log }) => {
  log.info(`enqueueing new URLs`);
  await enqueueLinks({
    selector: `ul[role="list"] a[href*="/products/"][id*="CardLink-template"]`,
    label: "products",
  });
});

router.addHandler("products", async ({ request, page, log, pushData }) => {
  const title = await page.title();
  log.info(`${title}`, { url: request.loadedUrl });

  const data = await page.evaluate(() => {
    const name = document.querySelector(`h1`)?.textContent;

    // Price thingy
    const priceText = document
      .querySelector(`.price-item.price-item--regular`)
      ?.textContent.replaceAll(`\n`, ``)
      .trim();

    const price = priceText.split(` `)[0];
    const currency = priceText.split(` `)[1];

    return { name, price, currency };
  });

  console.log(data);

  await pushData(data);
});
