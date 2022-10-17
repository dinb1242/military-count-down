import Link from 'next/link';
import { HiArrowCircleLeft, HiLogout } from 'react-icons/hi';
import { NextPage } from 'next';

export const BtnSignOut: NextPage = () => {
    return (
        <Link href={ '/auth/sign-in' }>
            <a className={'ring-1 flex justify-center items-center w-32 px-2 py-2 font-bold text-center text-xl select-none hover:ring-2 hover:duration-200 hover:cursor-pointer active:ring-4'}>
                로그아웃 <HiLogout className={ 'ml-2' }/>
            </a>
        </Link>
    )
}

export default BtnSignOut;