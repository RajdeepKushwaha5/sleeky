interface VSCodeLogoProps {
  className?: string;
}

export function VSCodeLogo({ className }: VSCodeLogoProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid"
    >
      <defs>
        <linearGradient
          id="vscode-gradient"
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#0065A9" />
          <stop offset="100%" stopColor="#007ACC" />
        </linearGradient>
      </defs>
      <path
        d="M180.828 252.605a15.872 15.872 0 0 0 12.65-.486l52.501-25.262a15.94 15.94 0 0 0 9.025-14.364V41.197a15.939 15.939 0 0 0-9.025-14.363l-52.5-25.263a15.877 15.877 0 0 0-18.115 3.084L74.857 96.35l-43.78-33.232a10.614 10.614 0 0 0-13.56.603L3.476 76.494c-4.63 4.211-4.635 11.495-.012 15.713l37.967 34.638-37.967 34.637c-4.623 4.219-4.618 11.502.012 15.714l14.041 12.772a10.614 10.614 0 0 0 13.56.604l43.78-33.233 100.507 91.695a15.853 15.853 0 0 0 5.464 3.571zm10.464-183.649l-76.262 57.889 76.262 57.888z"
        fill="url(#vscode-gradient)"
      />
    </svg>
  );
}
