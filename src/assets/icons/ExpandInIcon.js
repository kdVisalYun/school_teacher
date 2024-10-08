const ExpandInIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="-1"
        y="1"
        width="22"
        height="22"
        rx="3"
        transform="matrix(-1 0 0 1 26 4)"
        stroke={color}
        strokeWidth="2"
      />
      <path d="M11.3549 4L11.3549 28" stroke={color} strokeWidth="2" />
      <path
        d="M20 12L17 16L20 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ExpandInIcon;
