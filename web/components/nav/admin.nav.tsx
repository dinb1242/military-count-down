import { BtnAdminNav } from "../buttons/btn-admin-nav";
import { AiFillHome, AiOutlinePartition, AiOutlineUser } from "react-icons/ai";
import React, { useState } from "react";
import Link from 'next/link';
import { NextPage } from "next";

interface AdminNavProps {
  pathname?: string
}

export const AdminNav: NextPage<AdminNavProps> = (props) => {

  const [btn, setBtn] = useState([
    {
      name: 'dashboard',
      href: '/admin/dashboard',
      icon: <AiFillHome/>,
      display: '대시보드',
      selected: props.pathname === '/admin/dashboard'
    },
    {
      name: 'userMgm',
      href: '/admin/userMgm',
      icon: <AiOutlineUser/>,
      display: '유저 관리',
      selected: props.pathname === '/admin/userMgm'
    },
    {
      name: 'accessHistLog',
      href: '/admin/accessHistLog',
      icon: <AiOutlinePartition/>,
      display: '접속 로그',
      selected: props.pathname === '/admin/accessHistLog'
    }
  ])

  const handleFocusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {name} = event.currentTarget;
    setBtn((prev) => {
      return prev.map(eachBtn => {
        eachBtn.selected = eachBtn.name === name;
        return eachBtn;
      });
    })
  }

  return (
    <div className={'h-full flex flex-col items-center py-16 border'}>
      <span className={'flex flex-col items-center'}>
        <h1 className={'text-3xl font-bold'}>전계 & 미위</h1>
        <h1 className={'text-3xl font-bold'}>관리자 페이지</h1>
      </span>
      <Link href={'/'}>
        <button
          className={'w-2/3 rounded my-8 bg-blue-500 border py-2 px-4 text-white text-xl hover:bg-blue-600 transition duration-200'}>
          메인 페이지
        </button>
      </Link>
      {
        btn.map(eachBtn => {
          return (
            <Link key={ Math.random().toString(36).substring(2, 12) } href={ eachBtn.href }>
              <BtnAdminNav
                name={ eachBtn.name }
                icon={ eachBtn.icon }
                text={ eachBtn.display }
                isSelected={ eachBtn.selected }
                onClick={(event) => handleFocusClick(event)}/>
            </Link>
          )
        })
      }
    </div>
  )
}
