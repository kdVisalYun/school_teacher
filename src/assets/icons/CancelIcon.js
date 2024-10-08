const CancelIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.61902 7.35303L24.3842 24.6469"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M24.5624 7.37276L7.43847 24.6271"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CancelIcon;
