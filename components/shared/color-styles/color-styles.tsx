import colors from "@/styles/colors.json";

type ColorEntry = {
  hex: string;
  hsl?: string; // new: we’ll support hsl in colors.json
  p3?: string;
};

const TYPED_COLORS = colors as unknown as Record<string, ColorEntry>;

// Build CSS variables for hex and hsl
const baseValues = Object.entries(TYPED_COLORS).map(([key, value]) => {
  const hexValue = value.hex.startsWith("#") ? value.hex : `#${value.hex}`;
  // Prefer hsl if provided, otherwise fallback to hex
  if (value.hsl) {
    return `--${key}: ${value.hsl}`;
  }
  return `--${key}: ${hexValue}`;
});

// Build CSS variables for P3
const p3Values = Object.entries(TYPED_COLORS)
  .filter(([, value]) => value.p3)
  .map(([key, value]) => `--${key}: color(display-p3 ${value.p3})`);

const colorsStyle = `
:root {
  ${baseValues.join(";\n  ")};
}

@supports (color: color(display-p3 1 1 1)) {
  :root {
    ${p3Values.join(";\n    ")}
  }
}
`;

export default function ColorStyles() {
  return <style dangerouslySetInnerHTML={{ __html: colorsStyle }} />;
}
