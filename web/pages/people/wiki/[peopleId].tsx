import BtnBack from "../../../components/buttons/btn-back";
import BtnSignOut from "../../../components/buttons/btn-sign-out";
import {NextPage} from "next";
import { useRouter } from 'next/router';
import Link from 'next/link';

export const PeopleWiki: NextPage<any> = () => {

    const router = useRouter();
    const { peopleId } = router.query;

    return (
        <div className={ 'min-h-screen p-8' }>
            <div className={ 'flex flex-row justify-between' }>
                <BtnBack where={'/people'} />
                <BtnSignOut />
            </div>

            {/* 위키 본문 바디 */}
            <div className={ 'border rounded py-8 px-12 w-full mt-16' }>
                {/* 상단 */}
                <div className={ 'w-full flex flex-row justify-between' }>
                    <h1 className={ 'font-bold text-2xl' }>이름</h1>
                    <Link href={ '/people/wiki/create/' + peopleId }>
                        <a>편집</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PeopleWiki;