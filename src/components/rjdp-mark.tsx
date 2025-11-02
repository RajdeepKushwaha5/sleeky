export function RJDPMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 120 40"
      {...props}
    >
      <text
        x="60"
        y="27"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="24"
        fontWeight="bold"
        fill="currentColor"
      >
        RJDP
      </text>
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 40"><text x="60" y="27" text-anchor="middle" font-family="monospace" font-size="24" font-weight="bold" fill="${color}">RJDP</text></svg>`;
}