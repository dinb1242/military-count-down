import BtnBack from "../../components/buttons/btn-back";
import BtnSignOut from "../../components/buttons/btn-sign-out";
import Hero from "../../components/heros/hero";
import React, {useState} from "react";

export const ProjectsCreate = () => {

    const [input, setInput] = useState({
        title: '',
        content: ''
    });

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setInput({
            ...input,
            [name]: value
        });
    }

    return (
        <div className={ 'min-h-screen p-8' }>
            <div className={ 'flex flex-row justify-between' }>
                <BtnBack where={'/projects'} />
                <BtnSignOut />
            </div>

            {/* 본문 바디 */}
            <div className={ 'w-full mt-16 flex justify-center' }>
                {/* 본문 */}
                <div className={ 'w-5/6 flex flex-col items-center border rounded p-8' }>
                    {/* 상단 및 inputs */}
                    <h1 className={ 'font-bold text-3xl' }>프로젝트 추가</h1>
                    <div className={ 'mt-4' }>
                        <label className={ 'label' }>
                            <span className={ 'label-text font-bold text-lg' }>제목</span>
                        </label>
                        <input name={ 'title' } type={ 'text' } className={ 'input input-info' } value={ input.title } onChange={ (event) => onChangeInput(event) } />
                    </div>

                    <div className={ 'mt-4' }>
                        <label className={ 'label' }>
                            <span className={ 'label-text font-bold text-lg' }>내용</span>
                        </label>
                        <input name={ 'content' } type={ 'text' } className={ 'input input-info' } value={ input.content } onChange={ (event) => onChangeInput(event) } />
                    </div>

                    <div className={ 'w-full mt-8' }>
                        <Hero title={ input.title } content={ input.content } />
                    </div>

                    <button className={ 'mt-8' }>추가하기</button>
                </div>
            </div>
        </div>
    );
}
export default ProjectsCreate;