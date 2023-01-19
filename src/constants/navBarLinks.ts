const links = [
  { to: "/", label: "Home" },
  { to: "/category/fruit", label: "Frutas" },
  { to: "/category/vegetable", label: "Verduras" },
  { to: "/category/grain", label: "Granos" },
  // { href: "/others", label: "Otros" },
];

export const getLabelByCategory = (category: string): string | null => {
  const link = links.find((link) => link.to.includes(category));
  if (!link) return null;
  return link.label;
};

export default links;
