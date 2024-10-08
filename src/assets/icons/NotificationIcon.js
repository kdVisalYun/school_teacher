const NotificationIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.14247 17.8851V11.8247C8.14247 7.50321 11.6457 4 15.9671 4V4C20.2886 4 23.7918 7.50322 23.7918 11.8247V17.8851L25.9788 19.7251C27.0343 20.6131 27.0343 22.238 25.9788 23.126V23.126C25.4581 23.5641 24.7995 23.8043 24.119 23.8043H7.88098C7.20051 23.8043 6.54189 23.5641 6.02119 23.126V23.126C4.96573 22.238 4.96573 20.6131 6.02119 19.7251L8.20822 17.8851"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12.3511 27.2193C15 28.2602 17 28.2602 19.847 27.2193"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default NotificationIcon;
