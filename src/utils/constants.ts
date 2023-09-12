export const categories = [
  "Mobiles & Tablets",
  "Electronics",
  "Fashion",
  "TVs & Application",
  "Beauty",
  "Home & Furniture",
].map((label) => ({
  label,
  value: label.toLowerCase().replaceAll(" ", "-"),
}));

export const sizes = ["S", "M", "L", "XL", "XXL"].map((label) => ({
  label,
  value: label.toLowerCase(),
}));
