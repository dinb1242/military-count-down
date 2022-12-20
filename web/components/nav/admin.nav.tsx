import { BtnAdminNav } from "../buttons/btn-admin-nav";
import { AiFillHome, AiOutlinePartition, AiOutlineUser } from "react-icons/ai";
import { useRef } from "react";
import Link from 'next/link';

export const AdminNav = () => {

  const btnRef = useRef();

  return (
    <div className={'h-full flex flex-col items-center py-16 border'}>
      <span className={ 'flex flex-col items-center' }>
        <h1 className={'text-3xl font-bold'}>전계 & 미위</h1>
        <h1 className={'text-3xl font-bold'}>관리자 페이지</h1>
      </span>
      <Link href={'/'}>
        <button
          className={'w-2/3 rounded my-8 bg-blue-500 border py-2 px-4 text-white text-xl hover:bg-blue-600 transition duration-200'}>
          메인 페이지
        </button>
      </Link>
      <BtnAdminNav icon={ <AiFillHome /> } text={'대시보드'} />
      <BtnAdminNav icon={ <AiOutlineUser /> } text={'회원 관리'} />
      <BtnAdminNav icon={ <AiOutlinePartition /> } text={'접속 로그'} />
    </div>
  )
}
