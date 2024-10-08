const ClassIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="22.431"
        cy="10.3636"
        r="2.11364"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="18.5"
        y="15.5"
        width="8"
        height="11"
        rx="4"
        stroke={color}
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5 6.5H8.5C7.39543 6.5 6.5 7.39543 6.5 8.5V23.5C6.5 24.6046 7.39543 25.5 8.5 25.5H16.5V27.5H8.5C6.29086 27.5 4.5 25.7091 4.5 23.5V8.5C4.5 6.29086 6.29086 4.5 8.5 4.5H23.5C24.9806 4.5 26.2732 5.30439 26.9649 6.49999H16.5V6.5Z"
        fill={color}
      />
      <path d="M9 11L15 11" stroke={color} strokeWidth="1.5" />
      <path d="M9 15H12" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

export default ClassIcon;
