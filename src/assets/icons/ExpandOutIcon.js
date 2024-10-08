const ExpandOutIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="5"
        width="22"
        height="22"
        rx="3"
        stroke={color}
        strokeWidth="2"
      />
      <path d="M20.6451 4L20.6451 28" stroke={color} strokeWidth="2" />
      <path
        d="M12 12L15 16L12 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ExpandOutIcon;
