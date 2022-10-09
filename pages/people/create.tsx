import { NextPage } from "next";
import { HiPlus } from 'react-icons/hi'

export const PeopleCreate: NextPage = () => {
    return (
        <div className={'min-h-screen p-8 flex flex-col items-center'}>
            {/* 등록 란 */}
            <div className={'flex flex-col items-center mt-32 w-96 h-96 border rounded shadow'}>
                <span className={'mt-8 font-bold text-2xl'}>추가하기</span>
                <div className={'mt-4 flex justify-center items-center rounded-full w-32 h-32 hover:cursor-pointer bg-gray-400 hover:ring-2 hover:duration-200 active:bg-gray-500'}>
                    <HiPlus className={'w-6 h-6'} />
                </div>
                {/* TODO: Input 태그 공통 컴포넌트 만들어놓을 것. */}
                <input value={'하이'}/>
            </div>
        </div>
    )
}

export default PeopleCreate;