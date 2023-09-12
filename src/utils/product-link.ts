export const productLink = (_name: string, uuid: string) => {
  const name = _name
    .replace(/[&\/\\#,+()$~%'":*?<>{}]/g, "")
    .replaceAll("-", "")
    .replaceAll("  ", " ")
    .split(" ")
    .join("-");
  return `${name}?pid=${uuid}`;
};
