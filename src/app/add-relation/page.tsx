import Header from "@/components/Header/Header";
import AddRelation from "@/components/Relation/AddRelation";

import {ADD_RELATION_PAGE_TITLE} from "@/constants/titleTags";

export const metadata = {
    title: ADD_RELATION_PAGE_TITLE,
};

const AddRelationPage = () => {
    return (
        <>
            <Header></Header>
            <main className={"main"}>
                <AddRelation/>
            </main>
        </>
    )
}

export default AddRelationPage;