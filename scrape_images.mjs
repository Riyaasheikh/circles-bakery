
import fs from "fs";
const queries = ["cake", "croissant", "pastry", "bread", "coffee", "sandwich", "pizza", "burger", "salad"];
const urls = [];

async function scrape() {
  for (const q of queries) {
    try {
      const res = await fetch(`https://unsplash.com/napi/search/photos?query=${q}&per_page=15`);
      const data = await res.json();
      for (const photo of data.results) {
        urls.push(photo.urls.regular);
      }
    } catch (e) {
      console.error("Error for", q, e.message);
    }
  }
  fs.writeFileSync("unsplash_urls.json", JSON.stringify(urls, null, 2));
  console.log("Scraped", urls.length, "images");
}

scrape();

