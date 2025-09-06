// For more information, see https://crawlee.dev/
import { PlaywrightCrawler } from "crawlee";
import { router } from "./routes.js";

const startUrls = ["https://apifytech.myshopify.com/"];

const crawler = new PlaywrightCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,
  // Comment this option to scrape the full website.
  maxRequestsPerCrawl: 20,
  launchContext: {
    launchOptions: {
      headless: false,
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    },
  },
});

await crawler.run(startUrls);
