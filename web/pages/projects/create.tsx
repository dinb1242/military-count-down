import BtnBack from "../../components/buttons/btn-back";
import BtnSignOut from "../../components/buttons/btn-sign-out";
import Hero from "../../components/heros/hero";
import React, { ChangeEvent, useRef, useState } from "react";
import { HiPlusCircle } from "react-icons/hi";
import AlertModal from "../../components/modals/alert.modal";
import { LoadingSpin } from "../../components/spinning/loading.spin";
import ProjectApi from "../../apis/project.api";
import FileApi from "../../apis/file.api";
import { BbsType } from "../../enums/bbstype.enum";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AiOutlineCheck } from "react-icons/ai";

export const ProjectsCreate = () => {
  const router = useRouter();

  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  const [imageUrl, setImageUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imgRef = useRef<any>();

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleHeroImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files: any = event.currentTarget.files;
    if (files.length > 0) {
      const heroImage = files[0];
      const localHeroImageUrl = URL.createObjectURL(heroImage);

      setImageUrl(localHeroImageUrl);
    }
  };

  const validate = () => {
    return !(!input.title || !input.content);
  };

  const handleCreateClick = () => {
    setIsLoading(true);
    if (!validate()) {
      setIsModalOpen(true);
      setIsLoading(false);
    }

    // 생성 API 호출
    ProjectApi.create({
      title: input.title,
      content: input.content,
    })
      .then((res) => {
        const { success: isSuccess } = res.data;
        const { id: projectId } = res.data.data;
        if (isSuccess) {
          const file = imgRef.current.files[0];
          const formData = new FormData();
          formData.append('file', file);

          if (file) {
            FileApi.upload(BbsType.PROJECT, projectId, formData).then(() => {
              router.push("/projects");
            });
          }
          toast.success('프로젝트가 성공적으로 생성되었습니다.', {
            style: {
              width: '400px'
            },
            icon: <AiOutlineCheck />
          })
          router.push("/projects");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={"min-h-screen p-8"}>
      <AlertModal
        handleModal={handleModalOpen}
        isOpen={isModalOpen}
        title={"생성 오류"}
        content={"필수 입력란을 모두 입력해주세요."}
      />
      <div className={"flex flex-row justify-between"}>
        <BtnBack where={"/projects"} />
        <BtnSignOut />
      </div>

      {/* 본문 바디 */}
      <div className={"w-full mt-16 flex justify-center"}>
        {/* 본문 */}
        <div className={"w-5/6 flex flex-col items-center border rounded p-8"}>
          {/* 상단 및 inputs */}
          <h1 className={"font-bold text-3xl"}>프로젝트 추가</h1>
          <div className={"mt-4"}>
            <label className={"label"}>
              <span className={"label-text font-bold text-lg"}>
                <span className={"text-red-500"}>* </span>
                제목
              </span>
            </label>
            <input
              name={"title"}
              type={"text"}
              maxLength={50}
              className={"input input-info w-96"}
              value={input.title}
              onChange={(event) => onChangeInput(event)}
            />
          </div>

          <div className={"mt-4"}>
            <label className={"label"}>
              <span className={"label-text font-bold text-lg"}>
                <span className={"text-red-500"}>* </span>
                내용
              </span>
            </label>
            <input
              name={"content"}
              type={"text"}
              maxLength={100}
              className={"input input-info w-96"}
              value={input.content}
              onChange={(event) => onChangeInput(event)}
            />
          </div>
          <label htmlFor={"heroImage"} className={"w-full mt-8"}>
            <Hero
              title={input.title}
              content={input.content}
              backgroundImg={imageUrl}
              isCreated={true}
            />
            <input
              id={"heroImage"}
              type={"file"}
              className={"hidden"}
              onChange={(event) => handleHeroImageChange(event)}
              ref={imgRef}
              accept={'image/png, image/jpg, image/jpeg'}
            />
          </label>

          {isLoading ? (
            <div className={"mt-8"}>
              <LoadingSpin />
            </div>
          ) : (
            <button
              className={
                "mt-8 border text-lg p-2 rounded text-white font-bold bg-blue-500 flex items-center hover:bg-blue-600 active:bg-blue-700 transition duration-200"
              }
              onClick={handleCreateClick}
            >
              <HiPlusCircle className={"mr-1"} />
              추가하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProjectsCreate;
