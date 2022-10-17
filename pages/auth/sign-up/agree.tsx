import BtnBack from "../../../components/buttons/btn-back";
import BtnSignOut from "../../../components/buttons/btn-sign-out";
import { HiCheckCircle } from "react-icons/hi";

export const Agree = () => {

    const serviceTerm = `전역일 계산기 및 미림 위키(이하 '서비스'라 함)를 이용해주셔서 감사합니다.
    
지현이의 전역일 계산 및 미림미디어랩 재직 시 함께 했던 일들을 기록하는 서비스입니다.
본 서비스 이용약관 동의 시, 추후 정지현이 회사를 차릴 경우 프로젝트를 진행함에 있어서 함께 할 가능성이 있다는 것으로 간주됩니다.
미동의 시, 본 서비스를 이용할 수 없으며, 동의 이후 회원가입 진행 시 해당 정보는 데이터베이스에 영구 저장됩니다.
    `

    const privacyTerm = `본 서비스는 회원가입을 통해 최소한의 정보(아이디, 비밀번호, 성명, 휴대번호)만 수집합니다.
동일한 성명은
    `

    return (
        <div className={ 'min-h-screen p-8' }>
            <div className={ 'flex flex-row justify-between' }>
                <BtnBack where={'/auth/sign-in'} />
            </div>

            {/* 회원가입 폼 */}
            <div className={ 'w-full flex flex-col items-center' }>
                <div className={ 'w-1/2 h-auto border mt-16 w-2/3 flex flex-col items-center p-8' }>
                    <ul className="steps">
                        <li className="step step-info font-bold">개인정보이용약관 동의</li>
                        <li className="step font-bold">회원가입</li>
                        <li className="step font-bold">완료</li>
                    </ul>

                    <h1 className={ 'mt-8 text-3xl font-bold' }>개인정보이용약관 동의</h1>
                    <div className={ 'w-full mt-4' }>
                        <label className="label cursor-pointer">
                            <span className="label-text font-bold text-xl flex flex-row items-center">
                                <HiCheckCircle className={ 'text-gray-500 w-8 h-8 mr-2' } />
                                <span>전역일 계산기 및 미림 위키 이용 약관</span>
                                <span>(필수)</span>
                            </span>
                        </label>
                        <textarea
                            className="textarea textarea-info w-full h-48"
                            readOnly
                            value={
                                serviceTerm
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Agree;