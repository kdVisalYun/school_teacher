const RefreshIcon = ({ width, height, color }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 33.000000 33.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,33.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <path
          d="M215 310 c-3 -5 -25 -10 -49 -10 -79 0 -147 -66 -148 -142 -2 -90 59
-153 147 -153 87 0 149 63 147 152 0 53 -4 58 -31 43 -16 -8 -21 -20 -21 -50
0 -60 -35 -95 -95 -95 -39 0 -51 5 -71 28 -52 61 -11 167 65 167 23 0 29 -4
25 -15 -7 -16 24 -19 79 -6 l28 6 -31 43 c-34 46 -36 47 -45 32z"
        />
      </g>
    </svg>
  );
};

export default RefreshIcon;
