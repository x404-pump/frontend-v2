import dynamic from "next/dynamic"
import Toolbar from "./Toolbar"

const CollectionsContainer = dynamic(() => import("./CollectionsContainer"))

function CollectionsSection() {
    return (
        <div className="space-y-4 h-full">
            <Toolbar />
            <h1 className="text-2xl font-semibold text-foreground-900">Collections</h1>
            <CollectionsContainer />
        </div>
    )
}
export default dynamic(() => Promise.resolve(CollectionsSection))