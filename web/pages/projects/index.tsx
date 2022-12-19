import BtnBack from "../../components/buttons/btn-back";
import BtnSignOut from "../../components/buttons/btn-sign-out";
import Hero from "../../components/heros/hero";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";
import { useEffect, useState } from "react";
import ProjectApi from "../../apis/project.api";

interface FindAll {
  id: number;
  title: string;
  content: string;
  thumbnailList: ThumbnailList;
  createdAt: string;
  updatedAt: string;
}

interface ThumbnailList {
  id: number;
  filePath: string;
  filename: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export const Projects = () => {
  const [findAll, setFindAll] = useState<FindAll[]>();
  const [s, st] = useState(-1);

  // Hero 제거 이후 리렌더링을 위한 Trick 핸들러
  const trickHandler = () => {
    st((prev) => prev + 1);
  }

  // 데이터 Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProjectApi.findAll();
        const { data } = response.data;
        setFindAll(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [s]);

  if (!findAll) return null;

  return (
    <div className={"min-h-screen p-8"}>
      <div className={"flex flex-row justify-between"}>
        <BtnBack where={"/"} />
        <BtnSignOut />
      </div>

      <div className={"p-8 mt-8 flex flex-col items-center"}>
        <div>
          <Link href={"/projects/create"}>
            <a
              className={
                "mb-2 text-lg font-bold bg-blue-500 text-white px-4 py-1 rounded flex items-center gap-1 hover:bg-blue-600 hover:duration-200 active:bg-blue-700"
              }
            >
              <HiPlusCircle /> 추가하기
            </a>
          </Link>
        </div>

        {/* 본문 */}
        <div className={"border grid grid-cols-1 gap-y-4 p-8 w-5/6"}>
          {findAll &&
            findAll.map((eachData) => {
              return (
                <Hero
                  key={eachData.id}
                  id={eachData.id}
                  title={eachData.title}
                  content={eachData.content}
                  backgroundImg={ eachData.thumbnailList.filePath && eachData.thumbnailList.filePath}
                  trickHandler={ trickHandler }
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
