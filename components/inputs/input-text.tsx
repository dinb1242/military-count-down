import { NextPage } from 'next';
import React, { useState } from 'react';

interface Props {
    placeholder: string;
    onChangeCallback: React.ChangeEvent<HTMLInputElement>;
}

/**
 * Text 형태의 Input 공용 컴포넌트
 * @param placeholder 플레이스홀더
 * @param onChangeCallback 상태 변경 함수
 * @constructor
 */
export const InputText: NextPage<Props> = ({ placeholder, onChangeCallback }) => {

    const [input, setInput] = useState('');

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setInput(value);
    }

    return (
        <input className={ 'border p-2' } type={'text'} placeholder={ placeholder} value={ input } onChange={ (event) => onChangeCallback }  />
    )
}

export default InputText;