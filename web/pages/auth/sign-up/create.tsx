import BtnBack from "../../../components/buttons/btn-back";
import Bonobono from "../../../public/bonobono.jpeg";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
import { NextPageContext } from "next";
import { ChangeEvent, useState } from "react";
import { LoadingSpin } from "../../../components/spinning/loading.spin";
import AuthApi from "../../../apis/auth.api";
import AlertModal from "../../../components/modals/alert.modal";
import { useRouter } from 'next/router';

export const getServerSideProps = async (context: NextPageContext) => {
  const {agreeYn} = context.query;

  if (!agreeYn) {
    return {
      redirect: {
        permanent: true,
        destination: "/auth/sign-up/agree",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export const SignUpCreate = () => {
  const router = useRouter();

  let emailRegexp = new RegExp(
    "^([\\w\\.\\_\\-])*[a-zA-Z0-9]+([\\w\\.\\_\\-])*([a-zA-Z0-9])+([\\w\\.\\_\\-])+@([a-zA-Z0-9]+\\.)+[a-zA-Z0-9]{2,8}$"
  );
  let passwordRegexp = new RegExp(
    "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$"
  );

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
    phoneFirst: "010",
    phoneSecond: "",
    phoneThird: "",
  });

  // 각 Input 의 초기 상태는 모두 true 이다.
  // 추후 양식 제출 시, Validator 를 거쳐 유효하지 않은 프로퍼티가 있을 경우 false 로 변경된다.
  const [isInputsValidate, setIsInputsValidate] = useState({
    email: true,
    password: true,
    name: true,
    phone: true,
  });

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );
  const [isPasswordAvailable, setIsPasswordAvailable] = useState<boolean | null>(null);
  const [isPasswordCheckOk, setIsPasswordCheckOk] = useState<boolean | null>(
    null
  );

  const [isEmailCheckAlertOpen, setIsEmailCheckAlertOpen] = useState(false);
  const [isPasswordAlertOpen, setIsPasswordAlertOpen] = useState(false);
  const [isPasswordCheckAlertOpen, setIsPasswordCheckAlertOpen] =
    useState(false);
  const [isNameAlertOpen, setIsNameAlertOpen] = useState(false);
  const [isPhoneAlertOpen, setIsPhoneAlertOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // 회원가입 입력 폼 상태 관리
  const handleInputsChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = event.currentTarget;

    // 이메일 Value 가 변경되었을 경우, isInputsValidate 를 name 에 맞게 초기화한다.
    if (name === "email") {
      setIsInputsValidate({
        ...isInputsValidate,
        email: true,
      });
      setIsEmailAvailable(null);
    }

    if (name === "password") {
      if (!value.match(passwordRegexp)) {
        setIsInputsValidate({
          ...isInputsValidate,
          password: true,
        });
        setIsPasswordAvailable(false);
      } else {
        setIsPasswordAvailable(true);
      }
    }

    if (name === "passwordCheck") {
      if (inputs.password != value) {
        setIsPasswordCheckOk(false);
      } else {
        setIsPasswordCheckOk(true);
      }
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleEmailCheckClick = () => {
    if (!inputs.email.match(emailRegexp)) {
      setIsInputsValidate({
        ...isInputsValidate,
        email: false,
      });

      return;
    }

    AuthApi.checkEmail({email: inputs.email})
      .then((res) => {
        const {data: isSuccess} = res.data;
        if (isSuccess) {
          setIsEmailAvailable(true);
          setIsEmailCheckAlertOpen(false);
        } else {
          setIsEmailAvailable(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("서버에 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  // 회원가입 양식 제출 전 입력 폼 검증 메소드
  const validateInputs = () => {
    let isAllValidate = true;
    // 이메일 중복 체크가 안 되었을 경우, 혹은 중복된 상태에서 검증을 시도할 경우 예외 모달을 출력한다.
    if (!isEmailAvailable) {
      setIsRegisterValModalOpen(true);
      setIsEmailCheckAlertOpen(true);

      isAllValidate = false;
    }

    // 이메일이 정규표현식에 맞지 않을 경우
    if (!inputs.email.match(emailRegexp)) {
      setIsInputsValidate({
        ...isInputsValidate,
        email: false,
      });

      isAllValidate = false;
    }

    // 비밀번호가 정규표현식에 맞지 않을 경우
    if (!isPasswordAvailable) {
      setIsRegisterValModalOpen(true);
      setIsPasswordAlertOpen(true);

      isAllValidate = false;
    } else {
      setIsPasswordAlertOpen(false);
    }

    // 비밀번호 확인과 비밀번호가 일치하지 않을 경우
    if (inputs.password !== inputs.passwordCheck) {
      setIsPasswordCheckAlertOpen(true);
      isAllValidate = false;
    } else setIsPasswordCheckAlertOpen(false);

    // 성명이 공백일 경우
    if (!inputs.name) {
      setIsNameAlertOpen(true);
      isAllValidate = false;
    } else setIsNameAlertOpen(false);

    // 휴대번호가 올바르지 않을 경우
    const phoneFirstList = ["010", "011", "016", "019"];
    if (phoneFirstList.indexOf(inputs.phoneFirst) === -1) {
      setIsPhoneAlertOpen(true);
      isAllValidate = false;
    } else {
      setIsPhoneAlertOpen(false);
    }
    if ((inputs.phoneSecond.length !== 4 || isNaN(Number(inputs.phoneSecond))) || (inputs.phoneThird.length !== 4 || isNaN(Number(inputs.phoneThird)))) {
      setIsPhoneAlertOpen(true);
      isAllValidate = false;
    } else setIsPhoneAlertOpen(false);

    return isAllValidate;
  };

  // 회원가입 양식 제출
  const handleRegisterClick = () => {
    setIsLoading(true);
    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }

    AuthApi.signUp({
      email: inputs.email,
      password: inputs.password,
      name: inputs.name,
      phone: inputs.phoneFirst + inputs.phoneSecond + inputs.phoneThird
    }).then(() => {
      router.push('/auth/sign-up/complete?complete=true', '/auth/sign-up/complete');
    }).catch(() => {
      setIsPhoneValModalOpen(true);
    })
  };

  const [isRegisterValModalOpen, setIsRegisterValModalOpen] = useState(false);
  const handleRegisterModal = () => {
    setIsRegisterValModalOpen((a) => !a);
  };

  const [isPhoneValModalOpen, setIsPhoneValModalOpen] = useState(false);
  const handlePhoneValModal = () => {
    setIsPhoneValModalOpen((a) => !a);
    setIsLoading(false);
  };

  return (
    <div className={"min-h-screen p-8"}>
      <AlertModal
        isOpen={isRegisterValModalOpen}
        handleModal={handleRegisterModal}
        title={"회원가입 실패"}
        content={"회원가입을 위한 요구 조건이 충족되지 않았습니다."}
      />

      <AlertModal
        isOpen={isPhoneValModalOpen}
        handleModal={handlePhoneValModal}
        title={"회원가입 실패"}
        content={"이미 존재하는 휴대번호입니다."}
      />

      <div className={"flex flex-row justify-between"}>
        <BtnBack where={"/auth/sign-up/agree"}/>
      </div>

      {/* 등록 전체 폼 */}
      <div className={"w-full flex justify-center mt-16"}>
        <div
          className={
            "lg:w-1/2 md:w-2/3 w-11/12 h-auto border rounded p-8 flex flex-col items-center"
          }
        >
          <ul className="steps w-full">
            <li className="step step-info font-bold">약관동의</li>
            <li className="step step-info font-bold">회원가입</li>
            <li className="step font-bold">완료</li>
          </ul>
          <h1 className={"mt-8 text-3xl font-bold"}>회원가입</h1>

          {/* 등록 폼 */}
          <div
            className={
              "mt-8 w-full h-auto 2xl:grid 2xl:grid-cols-2 2xl:gap-4 flex flex-col"
            }
          >
            <div>
              <label className={"label"}>
                <span className={"label-text font-bold text-lg"}>
                  <span className={"text-red-500"}>* </span>
                  이메일
                </span>
              </label>
              <div className={"flex flex-row"}>
                <input
                  name={"email"}
                  type={"text"}
                  className={"input input-bordered w-full"}
                  onChange={handleInputsChange}
                />
                <button
                  className={
                    "ml-2 xl:w-1/3 w-1/2 text-sm border rounded bg-sky-500 text-white font-bold hover:bg-sky-600 active:bg-sky-700 transition duration-200"
                  }
                  onClick={handleEmailCheckClick}
                >
                  중복확인
                </button>
              </div>
              {!isInputsValidate.email && (
                <span className={"text-red-500 text-sm select-none"}>
                  유효하지 않은 이메일입니다.
                </span>
              )}
              {isEmailAvailable === false && (
                <span className={"text-red-500 text-sm select-none"}>
                  사용할 수 없는 이메일입니다.
                </span>
              )}
              {isEmailAvailable === true && (
                <span className={"text-green-500 text-sm select-none"}>
                  사용 가능한 이메일입니다.
                </span>
              )}
            </div>

            <div className={"row-span-3 m-auto hidden lg:block text-center"}>
              <Image width={"200%"} height={"200%"} src={Bonobono}/>
            </div>
            <div>
              <label className={"label"}>
                <span className={"label-text font-bold text-lg"}>
                  <span className={"text-red-500"}>* </span>
                  비밀번호
                </span>
                <span className={"label-text-alt text-sm"}>
                  8자 이상, 16자 이하, 하나 이상의 문자와 숫자
                </span>
              </label>
              <input
                name={"password"}
                type={"password"}
                className={"input input-bordered w-full"}
                onChange={handleInputsChange}
              />
              {isPasswordAvailable === true && (
                <span className={"text-green-500 text-sm select-none"}>
                  사용 가능한 비밀번호입니다.
                </span>
              )}
              {isPasswordAvailable === false && (
                <span className={"text-red-500 text-sm select-none"}>
                  적합한 비밀번호가 아닙니다.{" "}
                </span>
              )}
            </div>

            <div>
              <label className={"label"}>
                <span className={"label-text font-bold text-lg"}>
                  <span className={"text-red-500"}>* </span>
                  비밀번호 확인
                </span>
              </label>
              <input
                name={"passwordCheck"}
                type={"password"}
                className={"input input-bordered w-full"}
                onChange={handleInputsChange}
              />
              {isPasswordCheckOk === true && (
                <span className={"text-green-500 text-sm select-none"}>
                  비밀번호가 일치합니다.
                </span>
              )}
              {isPasswordCheckOk === false && (
                <span className={"text-red-500 text-sm select-none"}>
                  비밀번호가 일치하지 않습니다.
                </span>
              )}
            </div>
            <div>
              <label className={"label"}>
                <span className={"label-text font-bold text-lg"}>
                  <span className={"text-red-500"}>* </span>
                  성명
                </span>
              </label>
              <input
                name={"name"}
                type={"text"}
                className={"input input-bordered w-full"}
                onChange={handleInputsChange}
              />
            </div>
            <div className={"xl:col-span-1 col-span-2"}>
              <label className={"label"}>
                <span className={"label-text font-bold text-lg"}>
                  <span className={"text-red-500"}>* </span>
                  휴대번호
                </span>
              </label>
              <div className={"flex flex-row items-center w-full"}>
                <select
                  name={"phoneFirst"}
                  defaultValue="010"
                  className="select select-bordered w-1/3 max-w-xs"
                  onChange={handleInputsChange}
                >
                  <option>010</option>
                  <option>011</option>
                  <option>019</option>
                </select>
                <span className={"mx-1"}> - </span>
                <input
                  name={"phoneSecond"}
                  type={"text"}
                  className={"input input-bordered w-1/3"}
                  onChange={handleInputsChange}
                  maxLength={4}
                />
                <span className={"mx-1"}> - </span>
                <input
                  name={"phoneThird"}
                  type={"text"}
                  className={"input input-bordered w-1/3"}
                  onChange={handleInputsChange}
                  maxLength={4}
                />
              </div>
            </div>
          </div>

          {isEmailCheckAlertOpen && (
            <div className="alert alert-warning shadow-lg mt-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>이메일 중복 체크가 필요합니다.</span>
              </div>
            </div>
          )}

          {isPasswordAlertOpen && (
            <div className="alert alert-warning shadow-lg mt-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>비밀번호가 올바르지 않습니다.</span>
              </div>
            </div>
          )}

          {isPasswordCheckAlertOpen && (
            <div className="alert alert-warning shadow-lg mt-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>비밀번호 확인란이 비밀번호와 일치하지 않습니다.</span>
              </div>
            </div>
          )}

          {isNameAlertOpen && (
            <div className="alert alert-warning shadow-lg mt-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>성명은 공백일 수 없습니다.</span>
              </div>
            </div>
          )}

          {isPhoneAlertOpen && (
            <div className="alert alert-warning shadow-lg mt-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>휴대번호가 올바르지 않습니다.</span>
              </div>
            </div>
          )}

          {/* 가입 버튼 */}
          <div className={"mt-4 flex justify-end w-full"}>
            {!isLoading ? (
              <a
                className={
                  "justify-center lg:m-0 m-auto bg-emerald-500 lg:px-4 p-2 rounded text-white font-bold text-xl flex flex-row items-center hover:bg-emerald-600 hover:duration-200 active:bg-emerald-700"
                }
                onClick={handleRegisterClick}
              >
                다음 <HiArrowRight className={"ml-2"}/>
              </a>
            ) : (
              <div
                className={
                  "flex flex-row items-center justify-center lg:mr-4 m-auto"
                }
              >
                <LoadingSpin/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpCreate;
