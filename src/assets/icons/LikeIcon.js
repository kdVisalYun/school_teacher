const LikeIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 25L14.55 23.7052C9.4 19.1243 6 16.0932 6 12.3951C6 9.36403 8.42 7 11.5 7C13.24 7 14.91 7.79455 16 9.04033C17.09 7.79455 18.76 7 20.5 7C23.58 7 26 9.36403 26 12.3951C26 16.0932 22.6 19.1243 17.45 23.7052L16 25Z"
        fill={color}
      />
    </svg>
  );
};

export default LikeIcon;
