import fs from "node:fs";
import path from "node:path";

const logos = [
  { file: "aboriginal.svg", lines: ["abOriginal"], font: "'Georgia', 'Times New Roman', serif", size: 56, spacing: 2.4, weight: 500 },
  { file: "atello.svg", lines: ["ATELLO"], font: "'Didot', 'Bodoni MT', 'Times New Roman', serif", size: 60, spacing: 8.5, weight: 500 },
  { file: "baus.svg", lines: ["BAUS"], font: "'Arial Black', 'Arial', sans-serif", size: 58, spacing: 4.8, weight: 700 },
  { file: "cooper-and-co.svg", lines: ["Cooper & Co", "EYEWEAR"], font: "'Segoe Script', 'Brush Script MT', cursive", size: 52, spacing: 1.2, weight: 500, secondSize: 22, secondSpacing: 6.4 },
  { file: "einar.svg", lines: ["EINAR"], font: "'Helvetica Neue', 'Arial', sans-serif", size: 56, spacing: 10.2, weight: 400 },
  { file: "eyewear-a-z.svg", lines: ["A/Z", "EYEWEAR"], font: "'Trebuchet MS', 'Arial', sans-serif", size: 58, spacing: 2.2, weight: 700, secondSize: 20, secondSpacing: 5.6 },
  { file: "eyewear-ritzy.svg", lines: ["RITZY", "EYEWEAR"], font: "'Garamond', 'Times New Roman', serif", size: 58, spacing: 3.4, weight: 600, secondSize: 20, secondSpacing: 6.2 },
  { file: "lanea-cavallo.svg", lines: ["Lanea Cavallo"], font: "'Palatino Linotype', 'Book Antiqua', serif", size: 50, spacing: 2.1, weight: 600 },
  { file: "linea-cavalo.svg", lines: ["Linea Cavalo"], font: "'Palatino Linotype', 'Book Antiqua', serif", size: 50, spacing: 2.1, weight: 600 },
  { file: "marwitz-berlin.svg", lines: ["MARWITZ BERLIN"], font: "'Times New Roman', serif", size: 44, spacing: 5.8, weight: 600 },
  { file: "novatis-lunette.svg", lines: ["NOVATIS", "LUNETTE"], font: "'Verdana', 'Arial', sans-serif", size: 52, spacing: 4.4, weight: 700, secondSize: 22, secondSpacing: 7.6 },
  { file: "reserve.svg", lines: ["RESERVE"], font: "'Cambria', 'Times New Roman', serif", size: 56, spacing: 6.2, weight: 600 },
  { file: "vela.svg", lines: ["VELA"], font: "'Century Gothic', 'Arial', sans-serif", size: 58, spacing: 9.6, weight: 500 },
  { file: "brand-generic.svg", lines: ["NEW LOOK OPTIC", "BRAND"], font: "'Arial', sans-serif", size: 34, spacing: 3.2, weight: 700, secondSize: 18, secondSpacing: 7.0 },
];

const outDir = path.join(process.cwd(), "public", "brands", "logos");
fs.mkdirSync(outDir, { recursive: true });

for (const logo of logos) {
  const [primary, secondary] = logo.lines;
  const secondSize = logo.secondSize ?? Math.max(18, Math.floor(logo.size * 0.42));
  const secondSpacing = logo.secondSpacing ?? Math.max(2, logo.spacing * 0.65);

  const firstY = secondary ? 62 : 72;
  const secondY = 102;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 140" role="img" aria-label="${primary} logo">\n  <rect width="480" height="140" fill="#ffffff"/>\n  <text x="240" y="${firstY}" text-anchor="middle" fill="#0f3f48" font-family="${logo.font}" font-weight="${logo.weight}" font-size="${logo.size}" letter-spacing="${logo.spacing}">${primary}</text>${secondary ? `\n  <text x="240" y="${secondY}" text-anchor="middle" fill="#1ba7b8" font-family="'Arial', sans-serif" font-weight="600" font-size="${secondSize}" letter-spacing="${secondSpacing}">${secondary}</text>` : ""}\n</svg>\n`;

  fs.writeFileSync(path.join(outDir, logo.file), svg, "utf8");
}

console.log(`Generated ${logos.length} brand logos in ${outDir}`);
