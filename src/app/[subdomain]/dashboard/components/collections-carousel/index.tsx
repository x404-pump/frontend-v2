import dynamic from "next/dynamic"

const CollectionsCarousel = dynamic(() => import("./CollectionsCarousel"))

export default function CollectionsCarouselSection() {
    return (
        <div>
            <CollectionsCarousel />
        </div>
    )
}