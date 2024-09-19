import dynamic from "next/dynamic"
import TransactionsArea from "./component/transactions-area"

const ProfileArea = dynamic(() => import("./component/profile-area"))
const TabContainer = dynamic(() => import("./component/tab-container"))

function Page() {
    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
            <div className="flex flex-col gap-8 items-start w-full">
                <ProfileArea />
                <TabContainer />

            </div>
            <div>
                <TransactionsArea />
            </div>
        </div>

    )
}
export default dynamic(() => Promise.resolve(Page), { ssr: false })