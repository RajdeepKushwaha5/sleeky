export function RajdeepSinghWordmark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 300 40"
      {...props}
    >
      <text
        x="150"
        y="25"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="16"
        fontWeight="bold"
        fill="currentColor"
      >
        RAJDEEP SINGH
      </text>
    </svg>
  );
}

export function getWordmarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 300 40"><text x="150" y="25" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="${color}">RAJDEEP SINGH</text></svg>`;
}