import Toolbar from "./Toolbar"
import CollectionsContainer from "./CollectionsContainer"


export default function CollectionsSection() {
    return (
        <div className="space-y-4 h-full">
            <Toolbar />
            <CollectionsContainer />
        </div>
    )
}