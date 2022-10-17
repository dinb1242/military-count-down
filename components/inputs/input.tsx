import { NextPage } from 'next';
import React, { useState } from 'react';

export interface InputProps {
    id?: string;
    className?: string;
    placeholder?: string;
    name?: string;
    value?: string;
    type?: InputType;
    onChangeCallback?: any;
    onKeyUpCallback?: any;
}

export enum InputType {
    PASSWORD = 'password',
    TEXT = 'text'
}

/**
 * Text 형태의 Input 공용 컴포넌트
 * @param id 아이디
 * @param className 클래스
 * @param placeholder 플레이스홀더
 * @param name 이름
 * @param value 값
 * @param type 타입
 * @param onChangeCallback 상태 변경 함수
 * @param onKeyUpCallback
 * @constructor
 */
export const Input: NextPage<InputProps> = ({ id, className = '', placeholder, type, name, value, onChangeCallback, onKeyUpCallback }) => {

    const [input, setInput] = useState('');

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeCallback(event);
    }

    const onInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyUpCallback(event);
    }

    return (
        <input
            id={ id }
            className={ 'border p-2 ' + className }
            name={ name }
            type={ type }
            placeholder={ placeholder}
            value={ value }
            onChange={ onInputChange }
            onKeyUp={ onKeyUpCallback === undefined ? undefined : onInputKeyUp }
        />
    )
}

export default Input;