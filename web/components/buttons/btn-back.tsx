import Link from 'next/link';
import { HiArrowCircleLeft } from 'react-icons/hi';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

interface Props {
    where: string;
}

export const BtnBack: NextPage<Props> = ({ where }) => {

    return (
        <Link href={ where }>
            <a className={'ring-1 flex justify-center items-center w-32 px-2 py-2 font-bold text-center text-xl select-none hover:ring-2 hover:duration-200 hover:cursor-pointer active:ring-4'}>
                <HiArrowCircleLeft/> 뒤로가기
            </a>
        </Link>
    )
}

export default BtnBack;