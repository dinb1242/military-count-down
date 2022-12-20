import BtnBack from "../../../components/buttons/btn-back";
import BtnSignOut from "../../../components/buttons/btn-sign-out";
import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import WikiApi from "../../../apis/wiki.api";
import { WikiType } from "../../../enums/wiki-type.enum";
import ProjectApi from "../../../apis/project.api";
import { toast } from "react-toastify";
import { BtnScrollToTop } from "../../../components/buttons/btn-scroll-to-top";

const Viewer = dynamic(() => import("../../../components/inputs/tui-viewer"), {
  ssr: false,
});

interface Props {
  projectId: number;
}

interface FindOneProject {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface FindOneWiki {
  id: number;
  coworkerId: number;
  name: string;
  wikiContent: string;
  createdAt: string;
  updatedAt: string;
}

export const getServerSideProps = (context: NextPageContext) => {
  const {projectId} = context.query;

  return {
    props: {projectId},
  };
};

export const ProjectWiki: NextPage<Props> = ({projectId}) => {
  const router = useRouter();

  const [findOneProject, setFindOneProject] = useState<FindOneProject>();
  const [findOneWiki, setFindOneWiki] = useState<FindOneWiki>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProject = await ProjectApi.findOne(projectId);
        const responseWiki = await WikiApi.findOneWiki(WikiType.PROJECT, projectId);
        const {data: dataWiki} = responseWiki.data;
        const {data: dataProject} = responseProject.data;

        setFindOneProject(dataProject === null ? '' : dataProject);
        setFindOneWiki(dataWiki === null ? '' : dataWiki);
      } catch (err: any) {
        console.log(err);
        const {status} = err.response;
        if (status === 404) {
          router.push('/projects');
        }
        toast.error(err.response.data.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={"min-h-screen p-8"}>
      <div className={"flex flex-row justify-between"}>
        <BtnBack where={"/projects"}/>
        <BtnSignOut/>
      </div>

      {/* 위키 본문 바디 */}
      <div className={'flex justify-center'}>
        <div className={"border rounded py-8 px-12 w-full lg:w-1/2 mt-16"}>
          {/* 상단 */}
          <div className={"w-full flex flex-row justify-between"}>
            <h1 className={"font-bold text-3xl"}>{findOneProject && findOneProject.title}</h1>
            <div>
              {
                findOneWiki &&
                <Link href={"/projects/wiki/revision/" + findOneWiki.id + '?projectId=' + projectId}>
                  <a className={'hover:text-blue-500'}>역사</a>
                </Link>
              }
              <span> | </span>
              <Link href={"/projects/wiki/edit/" + projectId}>
                <a className={'hover:text-blue-500'}>편집</a>
              </Link>
            </div>
          </div>

          {/* 본문 */}
          {findOneWiki &&
            <div className={"mt-16"}>
              <Viewer initMarkdown={findOneWiki && findOneWiki.wikiContent}/>
            </div>
          }
        </div>
      </div>
      <BtnScrollToTop />
    </div>
  );
};

export default ProjectWiki;
