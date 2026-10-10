
import fs from "fs";

let menuData = fs.readFileSync("src/lib/menu-data.ts", "utf-8");
const urls = JSON.parse(fs.readFileSync("unsplash_urls.json", "utf-8"));

let urlIndex = 0;

// Regular expression to find item objects: { name: "...", ... }
// We can just look for `name: "` and insert `image: "URL", ` after it, if `image:` doesn"t exist.

const result = menuData.replace(/{ name: "(.*?)"([^}]*?)}/g, (match, name, rest) => {
  if (rest.includes("image:")) {
    return match; // Already has an image
  }
  const url = urls[urlIndex++];
  return `{ name: "${name}"${rest.trimEnd()}, image: "${url}" }`;
});

fs.writeFileSync("src/lib/menu-data.ts", result);
console.log("Updated items:", urlIndex);

