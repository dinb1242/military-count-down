import BtnBack from "../../components/buttons/btn-back";
import BtnSignOut from "../../components/buttons/btn-sign-out";
import Hero from "../../components/heros/hero";
import Link from "next/link";
import {HiPlusCircle} from "react-icons/hi";
import { useEffect, useState } from 'react';
import ProjectApi from '../../apis/project.api';
import { ENDPOINT } from '../../constants/api.constant';

interface FindAll {
    id: number,
    title: string,
    content: string,
    thumbnailList: ThumbnailList,
    createdAt: string,
    updatedAt: string
}

interface ThumbnailList {
    id: number,
    filePath: string,
    filename: string,
    fileSize: number,
    mimeType: string,
    createdAt: string,
    updatedAt: string
}

export const Projects = () => {

    const [findAll, setFindAll] = useState<FindAll[]>();

    // 데이터 Fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProjectApi.findAll();
                const { data } = response.data;
                setFindAll(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    if (!findAll)
        return null;

    return (
        <div className={ 'min-h-screen p-8' }>
            <div className={ 'flex flex-row justify-between' }>
                <BtnBack where={'/'} />
                <BtnSignOut />
            </div>

            <div className={ 'p-8 mt-8 flex flex-col items-center' }>
                <div>
                    <Link href={'/projects/create'}>
                        <a className={'mb-2 text-lg font-bold bg-blue-500 text-white px-4 py-1 rounded flex items-center gap-1 hover:bg-blue-600 hover:duration-200 active:bg-blue-700'}>
                            <HiPlusCircle/> 추가하기
                        </a>
                    </Link>
                </div>

                {/* 본문 */}
                <div className={ 'border grid grid-cols-1 gap-y-4 p-8 w-5/6' }>
                    {
                        findAll && findAll.map(eachData => {
                            return (
                                <Hero key={ eachData.id } title={ eachData.title } content={ eachData.content } backgroundImg={ `${ENDPOINT}/${eachData.thumbnailList.filePath}` } />
                            )
                        })
                    }
                    <div className="card 2xl:w-96 w-80 bg-base-100 shadow-xl image-full transition hover:-translate-y-2 cursor-pointer">
                        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">CodeB (2020.02. ~ 2020.06.)</h2>
                            <p>CodeB 는 웹 브라우저 상에서 파이썬 Web Assembly 기반으로 동작하는 블록 코딩 툴입니다.<br/><br/>초심자에게 파이썬과 데이터사이언스, 인공지능을 교육하기 위해 개발되었습니다.</p>
                        </div>
                    </div>
                    <div className="card 2xl:w-96 w-80 bg-base-100 shadow-xl image-full transition hover:-translate-y-2 cursor-pointer">
                        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">4cSoft 기반 인하공전 CodeB LMS</h2>
                            <p>4cSoft 의 LMS </p>
                        </div>
                    </div>
                    <div className="card 2xl:w-96 w-80 bg-base-100 shadow-xl image-full transition hover:-translate-y-2 cursor-pointer">
                        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Non-Programming 데이터 분석 툴</h2>
                            <p>4cSoft 의 LMS </p>
                        </div>
                    </div>
                    <div className="card 2xl:w-96 w-80 bg-base-100 shadow-xl image-full transition hover:-translate-y-2 cursor-pointer">
                        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">4cSoft 기반 청라고등학교 CodeB LMS</h2>
                            <p>4cSoft 의 LMS </p>
                        </div>
                    </div>
                    <div className="card 2xl:w-96 w-80 bg-base-100 shadow-xl image-full transition hover:-translate-y-2 cursor-pointer">
                        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">4cSoft 기반 미림미디어랩 CodeB LMS</h2>
                            <p>4cSoft 의 LMS </p>
                        </div>
                    </div>
                    <div className="card 2xl:w-96 w-80 bg-base-100 shadow-xl image-full transition hover:-translate-y-2 cursor-pointer">
                        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">4cSoft 기반 SBA 온보딩 LMS</h2>
                            <p>4cSoft 의 LMS </p>
                        </div>
                    </div>
                    <div className="card 2xl:w-96 w-80 bg-base-100 shadow-xl image-full transition hover:-translate-y-2 cursor-pointer">
                        <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">충남교통연수원 온라인 교육 LMS</h2>
                            <p>4cSoft 의 LMS </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Projects;