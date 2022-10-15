import { NextPage } from "next";
import { HiPlus } from 'react-icons/hi'
import BtnBack from '../../components/buttons/btn-back';
import InputText from '../../components/inputs/input-text';
import React, { useState } from 'react';

export const PeopleCreate: NextPage = () => {

    const [input, setInput] = useState({
        name: '',
        devPart: ''
    });

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value
        })
    }

    return (
        <div className={'min-h-screen p-8'}>
            <BtnBack where={'/people'} />
            <div className={'flex flex-col items-center'}>
                {/* 등록 란 */}
                <div className={'flex flex-col items-center mt-32 w-96 h-96 border rounded shadow'}>
                    <span className={'mt-8 font-bold text-2xl'}>추가하기</span>
                    <div className={'mt-4 flex justify-center items-center rounded-full w-32 h-32 hover:cursor-pointer bg-gray-400 hover:ring-2 hover:duration-200 active:bg-gray-500'}>
                        <HiPlus className={'w-6 h-6'} />
                    </div>
                    <div className={'mt-2'}>
                        이름 <InputText placeholder={'이름을 입력하세요.'} onChangeCallback={ onInputChange() } />
                    </div>
                    <div className={'mt-2'}>
                         <InputText placeholder={'이름을 입력하세요.'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PeopleCreate;