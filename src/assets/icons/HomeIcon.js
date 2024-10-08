const HomeIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 24V14.7534C4 13.4992 4.58829 12.3175 5.58911 11.5616L13.2678 5.76161C14.6569 4.71233 16.5652 4.68202 17.987 5.68665L26.3083 11.5665C27.3692 12.3162 28 13.5343 28 14.8333V24C28 26.2091 26.2091 28 24 28H8C5.79086 28 4 26.2091 4 24Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15.5 22.9524V18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default HomeIcon;
