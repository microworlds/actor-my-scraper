// For more information, see https://crawlee.dev/
import { PlaywrightCrawler } from "crawlee";
import { router } from "./routes.js";
import { Actor } from "apify";

// Init the actor
await Actor.init();

const { url } = await Actor.getInput();

const startUrls = [url];

const crawler = new PlaywrightCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,
  // Comment this option to scrape the full website.
  maxRequestsPerCrawl: 5,
  launchContext: {
    launchOptions: {
      headless: false,
      //   executablePath:
      //     "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    },
  },
});

await crawler.run(startUrls);
