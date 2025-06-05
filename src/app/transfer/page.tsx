import Header from "@/components/Header/Header";
import Transfer from "@/components/Transfer/Transfer";
import {TRANSFER_PAGE_TITLE} from "@/constants/titleTags";

export const metadata = {
    title: TRANSFER_PAGE_TITLE,
};
const TransferPage = () => {
    return (
        <>
            <Header></Header>
            <main className={"main"}>
                <Transfer/>
            </main>
        </>
    )
}

export default TransferPage;