import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import MirimLogo from '../public/mirim.jpg';

const Home: NextPage = () => {

  const [leftHours, setLeftHours] = useState<String>();

  useEffect(() => {
    setInterval(() => {
      const lastDate = new Date('2022-12-28').getTime();
      const diff = lastDate - Date.now();

      const diffHour = Math.floor((diff / (1000*60*60)));
      const diffMin = Math.floor((diff / (1000*60)) % 60);
      const diffSec = Math.floor(diff / 1000 % 60);

      setLeftHours(`${diffHour}시간 ${diffMin}분 ${diffSec}초`);
    }, 1000);
  }, [leftHours]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>전역일 카운트 다운</title>
        <link rel="icon" href="https://static.vecteezy.com/system/resources/previews/001/200/449/non_2x/clock-png.png" />
        <link href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap' rel='stylesheet'/>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Image src={MirimLogo} />
        <h1 className="mt-4 text-6xl font-bold text-yellow-500 underline underline-offset-8 select-none">전역일까지</h1>
        <h1 className="mt-10 text-6xl font-bold animate-bounce hover:text-blue-400 hover:duration-200 active:text-blue-600 select-none">
          { leftHours }
        </h1>
        <h1 className="mt-5 text-5xl font-bold text-blue-400">
          남았습니다.
        </h1>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a
            href="#"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600 hover:duration-200"
          >
            <h3 className="text-2xl font-bold">함께한 사람들 &rarr;</h3>
            <p className="mt-4 text-xl">
              신사업개발팀부터 솔루션개발팀까지
            </p>
          </a>

          <a
            href="#"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-rose-500 focus:text-rose-900 hover:duration-200"
          >
            <h3 className="text-2xl font-bold">진행한 프로젝트 &rarr;</h3>
            <p className="mt-4 text-xl">
              미림미디어랩에서 진행한 프로젝트
            </p>
          </a>

          <a
            href="#"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-gray-500 focus:text-gray-900 hover:duration-200"
          >
            <h3 className="text-2xl font-bold">사건/사고 &rarr;</h3>
            <p className="mt-4 text-xl">
              좌충우돌 지현이의 미림 사건/사고
            </p>
          </a>

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

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://github.com/dinb1242"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
          </svg>
          Made by 정지현
        </a>
      </footer>
    </div>
  )
}

export default Home
