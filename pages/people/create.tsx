import { NextPage } from "next";
import { HiMinus, HiMinusCircle, HiPlus } from 'react-icons/hi'
import BtnBack from '../../components/buttons/btn-back';
import Input, { InputType } from '../../components/inputs/input';
import React, { useEffect, useRef, useState } from 'react';
import { HiPlusCircle, HiOutlineUserAdd } from 'react-icons/hi';
import BtnSignOut from "../../components/buttons/btn-sign-out";

interface InputState {
    name: string;
    devPart: string;
    eachProject: string;
}

interface ProjectTagState {
    id: number;
    tag: string;
}

enum InputName {
    NAME = 'name',
    DEV_PART = 'devPart',
    EACH_PROJECT = 'eachProject'
}

export const PeopleCreate: NextPage = () => {

    const [input, setInput] = useState<InputState>({
        name: '',
        devPart: '',
        eachProject: ''
    });

    // 개발 프로젝트 태그를 관리하기 위한 State
    const nextId = useRef(0);
    const [projectTag, setProjectTag] = useState(Array<ProjectTagState>);

    const onInputChange: any = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value
        });
    }

    // Input 태그 엔터 감지
    const onKeyUpEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        // 클릭된 키가 Enter 이며, 참여 프로젝트 input value 가 공백이 아닐 경우 상태값을 변경한다.
        if (event.key === 'Enter') {
            addProjectTag();
        }
    }

    const onClickAddProjectTag = () => {
        addProjectTag();
    }

    const onClickRemoveAllProjectTags = () => {
        setProjectTag([]);
    }

    const addProjectTag = () => {
        if (input.eachProject !== '') {
            const eachProjectTag: string = input.eachProject;
            setProjectTag([
                ...projectTag,
                {
                    id: nextId.current,
                    tag: eachProjectTag
                }
            ]);

            // 프로젝트 Input Value 초기화
            setInput({
                ...input,
                ['eachProject']: ''
            })

            nextId.current++;
        }
    }

    // 태그 클릭 시 제거
    const removeEachProjectTag = (targetIdx: number) => {
        setProjectTag(projectTag.filter(eachProjectTag => eachProjectTag.id !== targetIdx));
    }

    return (
        <div className={'min-h-screen p-8'}>
            <div className={ 'flex flex-row justify-between' }>
                <BtnBack where={'/people'} />
                <BtnSignOut />
            </div>
            <div className={'flex flex-col items-center'}>
                {/* 등록 란 */}
                <div className={'flex flex-col items-center mt-16 w-96 h-auto border rounded shadow'}>
                    <span className={'mt-8 font-bold text-2xl'}>함께한 개발자 추가하기</span>
                    <div className={'mt-4 flex justify-center items-center rounded-full w-32 h-32 hover:cursor-pointer bg-gray-400 hover:ring-2 hover:duration-200 active:bg-gray-500'}>
                        <HiPlus className={'w-6 h-6'} />
                    </div>

                    {/* 폼 입력 란 */}
                    <div className={ 'w-11/12 grid grid-cols-3 row-auto p-2 items-center gap-y-2 mt-2' } >
                        <div className={ 'col-span-3' }>
                            <label className="label">
                                <span className="label-text">이름</span>
                            </label>
                            <input
                                className={ 'input input-bordered input-info w-full max-w-xs' }
                                placeholder={'이름을 입력하세요.'}
                                name={ InputName.NAME }
                                type={ InputType.TEXT }
                                value={ input.name }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className={ 'col-span-3' }>
                            <label className="label">
                                <span className="label-text">개발 파트</span>
                            </label>
                            <input
                                className={ 'input input-bordered input-info w-full max-w-xs' }
                                placeholder={'ex. Spring Boot, React...'}
                                name={ InputName.DEV_PART }
                                type={ InputType.TEXT }
                                value={ input.devPart }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className={ 'col-span-3' }>
                            {/* Enter Press 시, 태그를 추가한다. */}
                            <label className="label">
                                <span className="label-text">참여한 프로젝트</span>
                            </label>
                            <input
                                id={ 'testId' }
                                className={ 'input input-bordered input-info w-full max-w-xs' }
                                placeholder={'ex. 충남교통연수원...'}
                                name={ InputName.EACH_PROJECT }
                                type={ InputType.TEXT }
                                value={ input.eachProject }
                                onChange={ onInputChange }
                                onKeyUp={ onKeyUpEnter }
                            />
                        </div>

                        <div className={ 'col-start-1 text-white m-auto' }>
                            <button
                                className={ 'bg-red-500 p-2 flex flex-row justify-center items-center rounded hover:bg-red-600 active:bg-red-700 hover:duration-200' }
                                onClick={ onClickRemoveAllProjectTags }
                            >
                                <HiMinusCircle className={ 'mr-1' } /> 전체 삭제
                            </button>
                        </div>
                        <div className={ 'col-start-3 text-white m-auto' }>
                            <button
                                className={ 'bg-emerald-500 p-2 flex flex-row justify-center items-center rounded hover:bg-emerald-600 active:bg-emerald-700 hover:duration-200' }
                                onClick={ onClickAddProjectTag }
                            >
                                <HiPlusCircle className={ 'mr-1' } /> 추가
                            </button>
                        </div>
                        {
                            projectTag.map((eachProjectTag, idx) => {
                                return (
                                    <div className={ 'tooltip' } data-tip={ eachProjectTag.tag } key={ idx }>
                                        <button
                                            id={ eachProjectTag.id.toString() }
                                            className={ 'border w-11/12 truncate p-1 rounded text-center mx-2 select-none hover:bg-red-500 hover:duration-200 hover:text-white' }
                                            onClick={ (event) => removeEachProjectTag(parseInt(event.currentTarget.id)) }
                                        >
                                            { eachProjectTag.tag }
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={ 'col-span-3 text-white m-auto my-4' }>
                        <button className={ 'bg-blue-500 p-2 flex flex-row justify-center items-center rounded hover:bg-blue-600 active:bg-blue-700 hover:duration-200' }>
                            <HiOutlineUserAdd className={ 'mr-1' } /> 저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PeopleCreate;