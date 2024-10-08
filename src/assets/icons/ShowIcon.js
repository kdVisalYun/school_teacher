const ShowIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 12.8C16.868 12.8 17.7004 13.1371 18.3142 13.7373C18.9279 14.3374 19.2727 15.1513 19.2727 16C19.2727 16.8487 18.9279 17.6626 18.3142 18.2627C17.7004 18.8629 16.868 19.2 16 19.2C15.132 19.2 14.2996 18.8629 13.6858 18.2627C13.0721 17.6626 12.7273 16.8487 12.7273 16C12.7273 15.1513 13.0721 14.3374 13.6858 13.7373C14.2996 13.1371 15.132 12.8 16 12.8ZM16 7.99999C21.4545 7.99999 26.1127 11.3173 28 16C26.1127 20.6827 21.4545 24 16 24C10.5455 24 5.88727 20.6827 4 16C5.88727 11.3173 10.5455 7.99999 16 7.99999ZM6.37818 16C7.25991 17.7603 8.62906 19.2435 10.33 20.2808C12.0309 21.3181 13.9953 21.8681 16 21.8681C18.0047 21.8681 19.9691 21.3181 21.67 20.2808C23.3709 19.2435 24.7401 17.7603 25.6218 16C24.7401 14.2397 23.3709 12.7565 21.67 11.7192C19.9691 10.6818 18.0047 10.1319 16 10.1319C13.9953 10.1319 12.0309 10.6818 10.33 11.7192C8.62906 12.7565 7.25991 14.2397 6.37818 16Z"
        fill={color}
      />
    </svg>
  );
};

export default ShowIcon;
