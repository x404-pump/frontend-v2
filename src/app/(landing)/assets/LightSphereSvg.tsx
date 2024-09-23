interface LightSphereSvgProps extends React.SVGProps<SVGSVGElement> {

}
export default function SphereLightSvg({
    ...props
}: LightSphereSvgProps) {
    return (
        <svg
            width={props.width || "1024"}
            height={props.height || "64"}
            viewBox="0 0 768 768"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g filter="url(#filter0_f_4576_13054)">
                <circle cx="384" cy="384" r="256" fill="#9353D3" />
            </g>
            <g opacity="0.74" filter="url(#filter1_f_4576_13054)">
                <circle cx="384" cy="402" r="256" fill="#9353D3" />
            </g>
            <g filter="url(#filter2_f_4576_13054)">
                <circle cx="384" cy="366" r="256" fill="#9353D3" />
            </g>
            <circle cx="384" cy="348" r="256" fill="#9353D3" />
            <circle cx="384" cy="330" r="256" fill="currentColor" />
            <defs>
                <filter id="filter0_f_4576_13054" x="0" y="0" width="768" height="768" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="64" result="effect1_foregroundBlur_4576_13054" />
                </filter>
                <filter id="filter1_f_4576_13054" x="64" y="82" width="640" height="640" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="32" result="effect1_foregroundBlur_4576_13054" />
                </filter>
                <filter id="filter2_f_4576_13054" x="96" y="78" width="576" height="576" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="16" result="effect1_foregroundBlur_4576_13054" />
                </filter>
            </defs>
        </svg>
    )
}