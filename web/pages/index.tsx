import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Link from "next/link";
import BtnSignOut from "../components/buttons/btn-sign-out";
import { AiFillGithub, AiOutlineUser } from "react-icons/ai";
import GoodBye from '../public/goodbye.gif';

const Home: NextPage = () => {

  const [leftHours, setLeftHours] = useState<String>();
  const [timeFormat, setTimeFormat] = useState<String>("hours");
  const [isFinished, setIsFinished] = useState<Boolean>(false);

  // Date 에 인자를 직접 지정하면 month 의 경우, 0~11 까지의 값을 가진다.
  const lastDate = new Date(2022, 11, 28, 17, 59, 59).getTime();
  const diff = lastDate - Date.now();

  let diffDays: number = 0;
  let diffHour: number = 0;
  let diffMin: number = 0;
  let diffSec: number = 0;

  useEffect(() => {
    let timeout: any;
    if (diff < 0) {
      setIsFinished(true);
      setLeftHours(`${ diffHour }시간 ${ diffMin }분 ${ diffSec }초`);
    }
    else {
      if (timeFormat === 'hours') {
        timeout = setTimeout(() => {
          diffHour = Math.floor((diff / (1000 * 60 * 60)));
          diffMin = Math.floor((diff / (1000 * 60)) % 60);
          diffSec = Math.floor(diff / 1000 % 60);

          setLeftHours(`${ diffHour }시간 ${ diffMin }분 ${ diffSec }초`);
        }, 1000);
      } else {
        timeout = setTimeout(() => {
          diffDays = Math.floor((diff / (1000 * 60 * 60 * 24)));
          diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
          diffMin = Math.floor((diff / (1000 * 60)) % 60);
          diffSec = Math.floor(diff / 1000 % 60);

          setLeftHours(`${ diffDays }일 ${ diffHour }시간 ${ diffMin }분 ${ diffSec }초`);
        }, 1000);
      }
    }

    return () => clearTimeout(timeout);
  }, [leftHours, timeFormat]);


  const onClickFormat = () => {
    if (timeFormat === 'hours') {
      setTimeFormat('days');
    } else {
      setTimeFormat('hours');
    }
  }

  return (
    <div className={ "flex min-h-screen flex-col items-center justify-center p-8" }>
      <Head>
        <title>전역일 카운트 다운</title>
        <link href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap' rel='stylesheet'/>
      </Head>

      <div className={ 'w-full flex flex-row justify-end' }>
        <BtnSignOut />
      </div>

      <main className={ "flex w-full flex-1 flex-col items-center justify-center px-12 text-center" }>
        {/*<Image src={MirimLogo} />*/}
        <h1 className="mt-4 text-6xl font-bold text-yellow-500 underline underline-offset-8 select-none">전역일까지</h1>
        <h1 className="mt-10 text-6xl font-bold animate-bounce hover:text-blue-400 hover:duration-200 active:text-blue-600 select-none" onClick={ onClickFormat }>
          { leftHours }
        </h1>
        <h1 className="mt-5 text-5xl font-bold text-blue-400 select-none">
          남았습니다.
        </h1>

        {
          isFinished ?
              <div className={'mt-8 flex flex-col'}>
                <div>
                  <Image src={ GoodBye } />
                </div>
                <div className={ 'select-none' }>
                  <span className='text-6xl font-bold text-red-500'>★경★</span>
                  <span className='text-6xl font-bold'> 전역했습니다! 모두들 안녕! </span>
                  <span className='text-6xl font-bold text-red-500'>★축★</span>
                </div>
              </div> :
              null
        }

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <Link href={'/people'}>
            <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600 hover:duration-200">
              <h3 className="text-2xl font-bold">함께한 개발자들 &rarr;</h3>
              <p className="mt-4 text-xl">
                신사업개발팀부터 솔루션개발팀까지
              </p>
            </a>
          </Link>

          <Link href="/projects">
            <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600 hover:duration-200">
              <h3 className="text-2xl font-bold">진행한 프로젝트 &rarr;</h3>
              <p className="mt-4 text-xl">
                미림미디어랩에서 진행한 프로젝트
              </p>
            </a>
          </Link>

          <Link href={'/accident/wiki'}>
            <a
              href="#"
              className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-gray-500 focus:text-gray-900 hover:duration-200"
            >
              <h3 className="text-2xl font-bold">사건/사고 &rarr;</h3>
              <p className="mt-4 text-xl">
                좌충우돌 지현이의 미림 사건/사고
              </p>
            </a>
          </Link>

          <a
            href="#"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-lime-700 focus:text-lime-900 hover:duration-200"
          >
            <h3 className="text-2xl font-bold">회고 &rarr;</h3>
            <p className="mt-4 text-xl">
              더 훌륭한 개발자가 되기 위해!
            </p>
          </a>
        </div>
      </main>

      <footer className="mt-10 flex flex-col h-32 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2 font-bold"
          href="https://github.com/dinb1242"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
          </svg>
          Made by 정지현
        </a>
        <div className={ 'flex flex-row mt-4 gap-x-2' }>
          <Link href={ 'https://github.com/dinb1242' }>
            <a className="btn gap-2" target="_blank" rel="noopener noreferrer">
              <AiFillGithub /> Github
            </a>
          </Link>
          <Link href={ '/profile' }>
            <a className="btn gap-2">
              <AiOutlineUser /> Profile
            </a>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Home
