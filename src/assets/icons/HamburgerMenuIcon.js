const HamburgerMenuIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="charm:menu-hamburger">
        <path
          id="Vector"
          d="M5.5 24.5H26.5M5.5 16.5H26.5M5.5 8.5H26.5"
          stroke={color}
          strokeWidth="3"
          strokelineap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default HamburgerMenuIcon;
