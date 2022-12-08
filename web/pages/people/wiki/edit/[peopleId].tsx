import BtnBack from "../../../../components/buttons/btn-back";
import BtnSignOut from "../../../../components/buttons/btn-sign-out";

import { useRouter } from "next/router";
import MarkdownEditor from "../../../../components/inputs/md-editor";

export const PeopleWikiCreate = () => {

    const router = useRouter();
    const { peopleId } = router.query;

    return (
        <div className={ 'min-h-screen p-8' }>
            <div className={ 'flex flex-row justify-between' }>
                <BtnBack where={'/people/wiki/' + peopleId} />
                <BtnSignOut />
            </div>

            {/* 마크다운 에디터 */}
            <div className={ 'mt-8' }>
                <MarkdownEditor />
            </div>
        </div>
    );
}

export default PeopleWikiCreate;