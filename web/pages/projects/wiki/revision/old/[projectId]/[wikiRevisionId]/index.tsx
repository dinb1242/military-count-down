import BtnSignOut from '../../../../../../../components/buttons/btn-sign-out';
import { NextPage, NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { HiArrowCircleLeft } from 'react-icons/hi';
import ProjectApi from "../../../../../../../apis/project.api";
import WikiApi from "../../../../../../../apis/wiki.api";
import { toast } from "react-toastify";
import { BtnScrollToTop } from "../../../../../../../components/buttons/btn-scroll-to-top";

const Viewer = dynamic(() => import("../../../../../../../components/inputs/tui-viewer"), {
  ssr: false,
});

interface Props {
  projectId: number;
  wikiRevisionId: number;
}

interface FindOneRevision {
  id: number;
  authorId: number;
  wikiId: number;
  wikiContent: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

interface Author {
  id: number;
  email: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface FindOneProject {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const getServerSideProps = (context: NextPageContext) => {

  const {projectId, wikiRevisionId} = context.query;

  return {
    props: {projectId, wikiRevisionId}
  }
}

export const OldRevisionView: NextPage<Props> = ({projectId, wikiRevisionId}) => {
  const router = useRouter();

  const [findOneProject, setFindOneProject] = useState<FindOneProject>();
  const [findOneRevision, setFindOneRevision] = useState<FindOneRevision>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProject = await ProjectApi.findOne(projectId);
        const responseRevision = await WikiApi.findOneWikiRevision(wikiRevisionId);

        const {data: dataProject} = responseProject.data;
        const {data: dataRevision} = responseRevision.data;

        setFindOneProject(dataProject);
        setFindOneRevision(dataRevision);
      } catch (err: any) {
        console.log(err);
        const {status} = err.response;
        if (status === 404) {
          router.push('/projects');
        }
        toast.error(err.response.data.message);
      }
    }

    fetchData();
  }, [])

  return (
    <div className={"min-h-screen p-8"}>
      <div className={"flex flex-row justify-between"}>
        <div onClick={() => {
          router.back()
        }}>
          <button
            className={'ring-1 flex justify-center items-center w-32 px-2 py-2 font-bold text-center text-xl select-none hover:ring-2 hover:duration-200 hover:cursor-pointer active:ring-4'}>
            <HiArrowCircleLeft/> ????????????
          </button>
        </div>
        <BtnSignOut/>
      </div>

      {/* ?????? ?????? ?????? */}
      <div className={'flex justify-center'}>
        <div className={"border rounded py-8 px-12 w-full lg:w-1/2 mt-16"}>
          {/* ?????? */}
          <div className={"w-full flex flex-row justify-between"}>
            <h1
              className={"font-bold text-3xl"}>{findOneProject && findOneRevision && findOneProject.title + ` (Revision: ${findOneRevision.createdAt})`}</h1>
          </div>

          {/* ?????? */}
          {findOneRevision &&
            <div className={"mt-16"}>
              <Viewer initMarkdown={findOneRevision && findOneRevision.wikiContent}/>
            </div>
          }
        </div>
      </div>
      <BtnScrollToTop />
    </div>
  );
}

export default OldRevisionView;