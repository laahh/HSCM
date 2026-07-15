/** Contractor brand marks in /public */
export function contractorLogo(name: string): string | null {
  const n = name.toUpperCase().replace(/[()]/g, " ");
  if (n.includes("PAMA")) return "/pama.png";
  if (n.includes("BUMA")) return "/buma.png";
  if (n.includes("MTL")) return "/mtl.png";
  if (n.includes("MTN")) return "/mtn.jpg";
  if (n.includes("KDC")) return "/kdc.jpg";
  if (n.includes("FAD")) return "/fad.jpg";
  if (n.includes("BAR")) return "/bar.png";
  return null;
}
