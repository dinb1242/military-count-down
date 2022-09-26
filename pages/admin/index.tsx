import { NextPage } from "next";
import { ChangeEvent, useState } from "react";

const Login: NextPage = () => {
    const [id, setId] = useState<String>();

    const onChangeId = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setId(event.currentTarget.value);
    }

    return (
        <div className={'min-h-screen flex-col flex justify-center items-center'}>

            <div className={'text-2xl font-bold'}>
                    로그인
            </div>
            <div className={ 'flex flex-col w-96 h-96 border-2 border-black items-center' }>
                <div>
                    ID: <I np className={'border-2'} value={'asd'}  onChange={ (event) => onChangeId(event) }></I np>
                </div>
            </div>
        </div>
    );
}

export default Login;