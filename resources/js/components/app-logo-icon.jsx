export default function AppLogoIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-tent-tree-icon lucide-tent-tree"
        >
            <circle cx="4" cy="4" r="2" />
            <path d="m14 5 3-3 3 3" />
            <path d="m14 10 3-3 3 3" />
            <path d="M17 14V2" />
            <path d="M17 14H7l-5 8h20Z" />
            <path d="M8 14v8" />
            <path d="m9 14 5 8" />
        </svg>
    );
}