
import fs from "fs";

let menuData = fs.readFileSync("src/lib/menu-data.ts", "utf-8");
const urls = JSON.parse(fs.readFileSync("unsplash_urls.json", "utf-8"));

let urlIndex = 86; // Because we already used 86 urls

// More robust: search for `name: "..."` and inject `image: "url"` if it does not have one
// We can just inject `image: "...", ` right after `name: "...", `
const result = menuData.replace(/name: "(.*?)",/g, (match, name) => {
  // If the next few lines contain "image: ", we assume it"s already there.
  // Actually, wait, "name:" is unique to items? 
  // "label:" is for variants. So `name:` is indeed unique for Items (except maybe group label, but group has `label:` not `name:`? Oh wait: GROUPS has `label:`)
  // Wait, let"s just replace `name: "xxx",` with `name: "xxx", image: "URL",` ONLY if `image:` is NOT already assigned to this item.
  // Actually it"s safer to just inject it anyway, but we already have 86 injected at the END of the item block.
  return match; 
});

// Actually, let"s just rewrite the script to read the whole file, find every `name: "([^"]+)"` and if the block doesn"t have `image:` add it.

