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
