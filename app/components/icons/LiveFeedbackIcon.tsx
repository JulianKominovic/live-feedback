export default function LiveFeedbackIcon(
  props: React.HTMLAttributes<SVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      fill="none"
      {...props}
    >
      <path
        d="M7.5 72.84C7.5 40.8959 34.2017 15 67.14 15H256V246.36H7.5V72.84Z"
        fill="white"
      />
      <path
        d="M504.5 256C504.5 389.101 393.243 497 256 497C118.757 497 7.5 389.101 7.5 256C7.5 122.899 118.757 15 256 15C393.243 15 504.5 122.899 504.5 256Z"
        fill="white"
      />
      <circle cx="256" cy="256" r="189" fill="black" />
    </svg>
  );
}
