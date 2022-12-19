import { NextPage, NextPageContext } from "next";
import { HiMinusCircle, HiPlus, HiPlusCircle } from "react-icons/hi";
import BtnBack from "../../components/buttons/btn-back";
import { InputType } from "../../components/inputs/input";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import BtnSignOut from "../../components/buttons/btn-sign-out";
import { DevPart } from "../../enums/devpart.enum";
import CoworkerApi from "../../apis/coworker.api";
import { LoadingSpin } from "../../components/spinning/loading.spin";
import { AlertModal } from "../../components/modals/alert.modal";
import Image from "next/image";
import FileApi from "../../apis/file.api";
import { BbsType } from "../../enums/bbstype.enum";
import { useRouter } from "next/router";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";

interface InputState {
  name: string;
  devPart: string;
  eachProject: string;
}

interface ProjectTagState {
  id: string;
  tag: string;
}

interface InputValidated {
  name: boolean | null;
  devPart: boolean | null;
}

enum InputName {
  NAME = "name",
  DEV_PART = "devPart",
  EACH_PROJECT = "eachProject",
}

interface Props {
  coworkerId: number;
}

export const getServerSideProps = (context: NextPageContext) => {
  const { coworkerId } = context.query;
  return {
    props: {
      coworkerId,
    },
  };
};

export const PeopleUpdate: NextPage<Props> = ({ coworkerId }) => {
  const router = useRouter();

  const [findOne, setFindOne] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState<InputState>({
    name: "",
    devPart: "",
    eachProject: "",
  });

  const [isInputValidated, setIsInputValidated] = useState<InputValidated>({
    name: null,
    devPart: null,
  });

  // 개발 프로젝트 태그를 관리하기 위한 State
  const nextId = useRef(0);
  const [projectTag, setProjectTag] = useState(Array<ProjectTagState>);

  const onInputChange: any = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "name") {
      setIsInputValidated({
        ...isInputValidated,
        name: null,
      });
    }

    if (name === "devPart") {
      setIsInputValidated({
        ...isInputValidated,
        devPart: null,
      });
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  // Input 태그 엔터 감지
  const onKeyUpEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // 클릭된 키가 Enter 이며, 참여 프로젝트 input value 가 공백이 아닐 경우 상태값을 변경한다.
    if (event.key === "Enter") {
      addProjectTag();
    }
  };

  const onClickAddProjectTag = () => {
    addProjectTag();
  };

  const onClickRemoveAllProjectTags = () => {
    setProjectTag([]);
  };

  const addProjectTag = () => {
    if (input.eachProject !== "") {
      const eachProjectTag: string = input.eachProject;
      setProjectTag([
        ...projectTag,
        {
          id: Math.random().toString(36).substring(2, 12),
          tag: eachProjectTag,
        },
      ]);

      // 프로젝트 Input Value 초기화
      setInput({
        ...input,
        ["eachProject"]: "",
      });

      nextId.current++;
    }
  };

  // 태그 클릭 시 제거
  const removeEachProjectTag = (targetIdx: string) => {
    setProjectTag(
      projectTag.filter((eachProjectTag) => eachProjectTag.id !== targetIdx)
    );
  };

  // 파일 메소드
  const [imageUrl, setImageUrl] = useState<any>();
  const imgRef = useRef<any>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];

    const localImageUrl = URL.createObjectURL(file);

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(localImageUrl);
    };
  };

  // 유효성 검증 메소드
  const validate = () => {
    let isAllValidated = true;
    if (!input.name) {
      setIsInputValidated({
        ...isInputValidated,
        name: false,
      });

      isAllValidated = false;
    }

    if (!input.devPart) {
      setIsInputValidated({
        ...isInputValidated,
        devPart: false,
      });

      isAllValidated = false;
    }

    return isAllValidated;
  };

  // 생성 핸들러
  const handleUpdateClick = () => {
    setIsLoading(true);

    if (!validate()) {
      setIsModalOpen(true);
      setIsLoading(false);
      return;
    }

    CoworkerApi.update(coworkerId, {
      name: input.name,
      devPart: input.devPart,
      projects: projectTag.map((eachTag) => eachTag.tag),
    })
      .then((res) => {
        const { success } = res.data;
        const { id } = res.data.data;

        // 파일 저장
        if (success) {
          if (imgRef.current.files.length > 0) {
            const formData = new FormData();
            formData.append("file", imgRef.current.files[0]);
            FileApi.upload(BbsType.COWORKER, id, formData)
              .then((res) => {
                router.push("/people");
              })
              .catch((err) => {
                console.log(err.response.data.message);
              });
          }
          toast.success('함께한 개발자가 수정되었습니다.', {
            icon: <AiFillEdit className={'text-xl'} />
          });
          router.push("/people");
        }
      })
      .catch((err) => {
        setIsDuplicatedModalMessage(err.response.data.message);
        setIsDuplicatedModalOpen(true);
        setIsLoading(false);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen((currentOpenState) => !currentOpenState);
  };

  const [isDuplicatedModalOpen, setIsDuplicatedModalOpen] = useState(false);
  const [isDuplicatedModalMessage, setIsDuplicatedModalMessage] = useState("");
  const handleDuplicatedModal = () => {
    setIsDuplicatedModalOpen((currentOpenState) => !currentOpenState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CoworkerApi.findOne(coworkerId);
        setFindOne(response.data.data);
        setInput({
          name: response.data.data.name,
          devPart: response.data.data.devPart,
          eachProject: "",
        });
        const projects: string[] = response.data.data.projects;
        const projectTagList = projects.map((value) => {
          return {
            id: Math.random().toString(36).substring(2, 12),
            tag: value
          }
        });
        setProjectTag([...projectTagList])
        setImageUrl(response.data.data.profileImage.filePath);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // 클린업
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imageUrl);
    }
  }, []);

  if (!findOne) return null;

  return (
    <div className={"min-h-screen p-8"}>
      <AlertModal
        handleModal={handleModal}
        isOpen={isModalOpen}
        title={"생성 불가"}
        content={"필수 입력란을 입력해주세요."}
      />

      <AlertModal
        handleModal={handleDuplicatedModal}
        isOpen={isDuplicatedModalOpen}
        title={"생성 불가"}
        content={isDuplicatedModalMessage}
      />

      <div className={"flex flex-row justify-between"}>
        <BtnBack where={"/people"} />
        <BtnSignOut />
      </div>
      <div className={"flex flex-col items-center"}>
        {/* 등록 란 */}
        <div
          className={
            "flex flex-col items-center mt-16 w-96 h-auto border rounded shadow"
          }
        >
          <span className={"mt-8 font-bold text-2xl"}>
            함께한 개발자 수정
          </span>

          {/* 파일 업로드 */}
          <label htmlFor={"profileImage"}>
            <div
              className={
                "mt-4 flex justify-center relative items-center rounded-full w-32 h-32 hover:cursor-pointer bg-gray-400 hover:ring-2 hover:duration-200 active:bg-gray-500"
              }
            >
              {!imageUrl ? (
                <HiPlus className={"w-6 h-6"} />
              ) : (
                <Image
                  className={"rounded-full"}
                  src={imageUrl}
                  layout={"fill"}
                  objectFit={"cover"}
                />
              )}
            </div>
          </label>
          <input
            className={"hidden"}
            id={"profileImage"}
            type={"file"}
            accept={"image/jpg, image/png, image/jpeg"}
            onChange={(event) => handleFileChange(event)}
            multiple={false}
            ref={imgRef}
          />

          {/* 폼 입력 란 */}
          <div
            className={
              "w-11/12 grid grid-cols-3 row-auto p-2 items-center gap-y-2 mt-2"
            }
          >
            <div className={"col-span-3"}>
              <label className="label">
                <span className="label-text font-bold">
                  <span className={"text-red-500"}>* </span>
                  이름
                </span>
              </label>
              <input
                className={"input input-bordered input-info w-full max-w-xs"}
                placeholder={"이름을 입력하세요."}
                name={InputName.NAME}
                type={InputType.TEXT}
                value={input.name}
                onChange={onInputChange}
              />
              <br />
              {isInputValidated.name === false && (
                <span className={"text-sm text-red-500 select-none"}>
                  이름을 입력해주세요.
                </span>
              )}
            </div>
            <div className={"col-span-3"}>
              <label className="label">
                <span className="label-text font-bold">
                  <span className={"text-red-500"}>* </span>
                  개발 파트
                </span>
              </label>
              <select
                name={InputName.DEV_PART}
                onChange={onInputChange}
                defaultValue={input.devPart}
                className="select select-info w-full max-w-xs"
              >
                <option disabled>개발 파트를 선택해주세요.</option>
                <option value={DevPart.FULL_STACK}>Full-Stack</option>
                <option value={DevPart.BACKEND}>Back-end</option>
                <option value={DevPart.FRONTEND}>Front-end</option>
              </select>
              <br />
              {isInputValidated.devPart === false && (
                <span className={"text-sm text-red-500 select-none"}>
                  개발 파트를 선택해주세요.
                </span>
              )}
            </div>
            <div className={"col-span-3"}>
              {/* Enter Press 시, 태그를 추가한다. */}
              <label className="label">
                <span className="label-text font-bold">참여한 프로젝트</span>
              </label>
              <input
                id={"testId"}
                className={"input input-bordered input-info w-full max-w-xs"}
                placeholder={"ex. 충남교통연수원..."}
                name={InputName.EACH_PROJECT}
                type={InputType.TEXT}
                value={input.eachProject}
                onChange={onInputChange}
                onKeyUp={onKeyUpEnter}
              />
            </div>

            <div className={"col-start-1 text-white m-auto"}>
              <button
                className={
                  "bg-red-500 p-2 flex flex-row justify-center items-center rounded hover:bg-red-600 active:bg-red-700 hover:duration-200"
                }
                onClick={onClickRemoveAllProjectTags}
              >
                <HiMinusCircle className={"mr-1"} /> 전체 삭제
              </button>
            </div>
            <div className={"col-start-3 text-white m-auto"}>
              <button
                className={
                  "bg-emerald-500 p-2 flex flex-row justify-center items-center rounded hover:bg-emerald-600 active:bg-emerald-700 hover:duration-200"
                }
                onClick={onClickAddProjectTag}
              >
                <HiPlusCircle className={"mr-1"} /> 추가
              </button>
            </div>
            {projectTag.map((eachProjectTag, idx) => {
              return (
                <div
                  className={"tooltip"}
                  data-tip={eachProjectTag.tag}
                  key={idx}
                >
                  <button
                    id={eachProjectTag.id.toString()}
                    className={
                      "border w-11/12 truncate p-1 rounded text-center mx-2 select-none hover:bg-red-500 hover:duration-200 hover:text-white"
                    }
                    onClick={(event) =>
                      removeEachProjectTag(event.currentTarget.id)
                    }
                  >
                    {eachProjectTag.tag}
                  </button>
                </div>
              );
            })}
          </div>
          <div className={"col-span-3 text-white m-auto my-4"}>
            {!isLoading ? (
              <button
                className={
                  "bg-blue-500 p-2 flex flex-row justify-center items-center rounded hover:bg-blue-600 active:bg-blue-700 hover:duration-200"
                }
                onClick={handleUpdateClick}
              >
                <AiFillEdit className={"mr-1"} /> 수정
              </button>
            ) : (
              <LoadingSpin />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleUpdate;