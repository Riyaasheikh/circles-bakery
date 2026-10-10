
import fs from "fs";

let menuData = fs.readFileSync("src/lib/menu-data.ts", "utf-8");
const urls = JSON.parse(fs.readFileSync("unsplash_urls.json", "utf-8"));

// Clean up previously injected URLs
menuData = menuData.replace(/, image: "https:\/\/.*?" \}/g, " }");

let urlIndex = 0;

// Now, carefully inject right after `name: "xxx",`
// Wait, not all items have `name:` as first. Some might. Yes, in ITEMS they all have `name: "..."`.
// Also ensure we don"t replace `name:` that already has `image: item...` 
const result = menuData.replace(/name: "(.*?)",/g, (match, name) => {
  // If it"s one of the ones we gave a specific imported image to:
  if (["New York Cheesecake (Slice)", "New York Cheesecake (Whole)", "Blueberry Cheesecake (Slice)", "Lotus Cheesecake (Slice)", "Mango Cheesecake (Slice)", "Plain Butter Croissant"].includes(name)) {
    return match; // Keep as is, it already has an image later in the object
  }
  
  const url = urls[urlIndex++];
  return `name: "${name}",\n        image: "${url}",`;
});

fs.writeFileSync("src/lib/menu-data.ts", result);
console.log("Updated items:", urlIndex);

