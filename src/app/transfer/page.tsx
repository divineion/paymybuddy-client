import Header from "@/components/Header/Header";
import {TRANSFER_PAGE_TITLE} from "@/constants/titleTags";
import TransferPageComponent from "@/components/Transfer/TransferPageComponent";

export const metadata = {
    title: TRANSFER_PAGE_TITLE,
};
const TransferPage = () => {
    return (
        <>
            <Header></Header>
            <main className={"main"}>
                <TransferPageComponent/>
            </main>
        </>
    )
}

export default TransferPage;