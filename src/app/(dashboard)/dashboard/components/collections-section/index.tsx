import dynamic from "next/dynamic"
import Toolbar from "./Toolbar"
import { Container } from "@/components/ui"

const CollectionsContainer = dynamic(() => import("./CollectionsContainer"))

function CollectionsSection() {
    return (
        <div className="space-y-4 h-full">
            <Toolbar />
            <Container title="Collections">
                <CollectionsContainer />
            </Container>
        </div>
    )
}
export default dynamic(() => Promise.resolve(CollectionsSection))