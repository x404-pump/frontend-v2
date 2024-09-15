import dynamic from "next/dynamic"

const ProfileArea = dynamic(() => import("./component/profile-area"))
const TabContainer = dynamic(() => import("./component/tab-container"))

export default function Page() {
    return (
        <div className="flex flex-col gap-8 mx-64">
            <ProfileArea />
            <TabContainer />
        </div>
    )
}