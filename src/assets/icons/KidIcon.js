const KidIcon = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="16.4993"
        cy="7.27273"
        r="2.27273"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="23.5" cy="12" r="1.4" stroke={color} strokeWidth="1.2" />
      <circle cx="7.5" cy="12" r="1.4" stroke={color} strokeWidth="1.2" />
      <rect
        x="21.4"
        y="15.9"
        width="5.2"
        height="8.2"
        rx="2.6"
        stroke={color}
        strokeWidth="1.8"
      />
      <rect
        x="5.4"
        y="15.9"
        width="5.2"
        height="8.2"
        rx="2.6"
        stroke={color}
        strokeWidth="1.8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5482 14.7273C17.4633 14.7273 18.3061 15.0366 18.9779 15.5563C19.45 15.0534 20.0264 14.6496 20.6726 14.3794C19.6003 13.3558 18.1476 12.7273 16.5482 12.7273C14.7591 12.7273 13.1537 13.5137 12.0588 14.7597C12.6291 15.1203 13.1203 15.5946 13.5004 16.1508C14.2294 15.2806 15.3242 14.7273 16.5482 14.7273ZM13.2281 24.2109C12.7997 24.7288 12.2674 25.1577 11.6631 25.4656C12.7445 26.9987 14.5294 28 16.5482 28C18.416 28 20.0836 27.1428 21.1791 25.8003C20.5061 25.6024 19.893 25.2647 19.3733 24.8209C18.653 25.5489 17.6532 26 16.5482 26C15.1605 26 13.9389 25.2887 13.2281 24.2109Z"
        fill={color}
      />
    </svg>
  );
};

export default KidIcon;
