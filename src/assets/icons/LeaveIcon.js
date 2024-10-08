const LeaveIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 6H15.36C16.4646 6 17.36 6.89543 17.36 8V8.00481C17.4255 8.00161 17.4915 8 17.5578 8H19.36C19.36 5.79086 17.5691 4 15.36 4H8C5.79086 4 4 5.79086 4 8V24C4 26.2091 5.79086 28 8 28H15.36C17.5691 28 19.36 26.2091 19.36 24H17.5578C17.4915 24 17.4255 23.9984 17.36 23.9952V24C17.36 25.1046 16.4646 26 15.36 26H8C6.89543 26 6 25.1046 6 24V8C6 6.89543 6.89543 6 8 6Z"
        fill={color}
      />
      <path
        d="M10.72 15C10.1677 15 9.71997 15.4477 9.71997 16C9.71997 16.5523 10.1677 17 10.72 17L10.72 15ZM28.7071 16.7071C29.0976 16.3166 29.0976 15.6834 28.7071 15.2929L22.3431 8.92893C21.9526 8.53841 21.3194 8.53841 20.9289 8.92893C20.5384 9.31946 20.5384 9.95262 20.9289 10.3431L26.5858 16L20.9289 21.6569C20.5384 22.0474 20.5384 22.6805 20.9289 23.0711C21.3194 23.4616 21.9526 23.4616 22.3431 23.0711L28.7071 16.7071ZM10.72 17L28 17L28 15L10.72 15L10.72 17Z"
        fill={color}
      />
    </svg>
  );
};

export default LeaveIcon;
