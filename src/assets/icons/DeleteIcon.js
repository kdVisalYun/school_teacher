const DeleteIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.14286 23.7778C9.14286 25 10.1714 26 11.4286 26H20.5714C21.8286 26 22.8571 25 22.8571 23.7778V10.4444H9.14286V23.7778ZM24 7.11111H20L18.8571 6H13.1429L12 7.11111H8V9.33333H24V7.11111Z"
        fill={color}
      />
    </svg>
  );
};

export default DeleteIcon;
