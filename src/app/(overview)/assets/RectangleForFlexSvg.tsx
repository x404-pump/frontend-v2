interface RectangleForFlexSvgProps extends React.SVGProps<SVGSVGElement> {

}
export default function RectangleForFlexSvg({
    ...props
}: RectangleForFlexSvgProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg" width="703" height="455" viewBox="0 0 703 455"
            fill="none"
            {...props}
        >
            <g filter="url(#filter0_f_4582_19461)">
                <ellipse cx="351" cy="183.24" rx="180" ry="92.7208" transform="rotate(-180 351 183.24)" fill="#9353D3" />
            </g>
            <g opacity="0.74" filter="url(#filter1_f_4582_19461)">
                <ellipse cx="351" cy="176.721" rx="180" ry="92.7208" transform="rotate(-180 351 176.721)" fill="#7828C8" />
            </g>
            <g filter="url(#filter2_f_4582_19461)">
                <ellipse cx="351" cy="189.76" rx="180" ry="92.7208" transform="rotate(-180 351 189.76)" fill="#9353D3" />
            </g>
            <ellipse cx="351" cy="196.279" rx="180" ry="92.7208" transform="rotate(-180 351 196.279)" fill="#9353D3" />
            <g filter="url(#filter3_d_4582_19461)">
                <path d="M4 136.495C4 105.528 26.1818 78.976 57.0391 76.3749C93.7923 73.2768 142.299 72.2975 177.75 83.0001C260.704 108.044 287.5 221 351.5 221C415.5 221 442.296 108.044 525.25 83.0001C560.701 72.2975 609.208 73.2768 645.961 76.3749C676.818 78.976 699 105.528 699 136.495V383C699 418.346 670.346 447 635 447H68C32.6538 447 4 418.346 4 383V136.495Z" fill="currentColor" />
            </g>
            <defs>
                <filter id="filter0_f_4582_19461" x="81" y="0.519539" width="540" height="365.442" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="45" result="effect1_foregroundBlur_4582_19461" />
                </filter>
                <filter id="filter1_f_4582_19461" x="126" y="39" width="450" height="275.442" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="22.5" result="effect1_foregroundBlur_4582_19461" />
                </filter>
                <filter id="filter2_f_4582_19461" x="148.5" y="74.5389" width="405" height="230.442" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="11.25" result="effect1_foregroundBlur_4582_19461" />
                </filter>
            </defs>
        </svg>
    )
}