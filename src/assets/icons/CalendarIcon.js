const CalendarIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icons/calendar">
        <path
          id="Vector"
          d="M23.7778 24.8H8.22222V12.7H23.7778M20.4444 5V7.2H11.5556V5H9.33333V7.2H8.22222C6.98889 7.2 6 8.179 6 9.4V24.8C6 25.3835 6.23413 25.9431 6.65087 26.3556C7.06762 26.7682 7.63285 27 8.22222 27H23.7778C24.3671 27 24.9324 26.7682 25.3491 26.3556C25.7659 25.9431 26 25.3835 26 24.8V9.4C26 8.81652 25.7659 8.25695 25.3491 7.84437C24.9324 7.43179 24.3671 7.2 23.7778 7.2H22.6667V5M21.5556 17.1H16V22.6H21.5556V17.1Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default CalendarIcon;
