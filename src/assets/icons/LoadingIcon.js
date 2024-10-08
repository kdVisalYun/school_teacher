const LoadingIcon = () => {
  return (
    <svg
      className="w-full h-full m-auto"
      viewBox="0 0 200 200"
      color="#0ED34C"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="spinner-secondHalf">
          <stop offset="0%" stopOpacity="0" stopColor="white" />
          <stop offset="30%" stopOpacity="0.5" stopColor="#6FD68F63" />
        </linearGradient>
        <linearGradient id="spinner-firstHalf">
          <stop offset="30%" stopOpacity="1" stopColor="currentColor" />
          <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
        </linearGradient>
      </defs>

      <g strokeWidth="8">
        <path
          stroke="url(#spinner-secondHalf)"
          d="M 4 100 A 96 96 0 0 1 196 100"
        />
        <path
          stroke="url(#spinner-firstHalf)"
          d="M 196 100 A 96 96 0 0 1 4 100"
        />

        {/* <!-- 1deg extra path to have the round end cap --> */}
        <path
          stroke="currentColor"
          strokeLinecap="round"
          d="M 4 100 A 96 96 0 0 1 4 98"
        />
      </g>

      <animateTransform
        from="0 0 0"
        to="360 0 0"
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1300ms"
      />
    </svg>
  );
};

export default LoadingIcon;
