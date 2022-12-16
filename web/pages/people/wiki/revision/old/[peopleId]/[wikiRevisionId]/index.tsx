import BtnSignOut from '../../../../../../../components/buttons/btn-sign-out';
import { NextPage, NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import CoworkerApi from '../../../../../../../apis/coworker.api';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { HiArrowCircleLeft } from 'react-icons/hi';
import WikiApi from "../../../../../../../apis/wiki.api";
import { toast } from "react-toastify";

const Viewer = dynamic(() => import("../../../../../../../components/inputs/tui-viewer"), {
  ssr: false,
});

interface Props {
  peopleId: number;
  wikiRevisionId: number;
}

interface FindOneRevision {
  id: number;
  authorId: number;
  coworkerWikiId: number;
  wikiContent: string;
  coworkerWiki: CoworkerWiki;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

interface CoworkerWiki {
  id: number;
  coworkerId: number;
  name: string;
  wikiContent: string;
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

interface FindOneCoworker {
  id: number;
  name: string;
  devPart: string;
  projects: string[];
  profileImage: ProfileImage;
  createdAt: string;
  updatedAt: string;
}

interface ProfileImage {
  id: number;
  filename: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

export const getServerSideProps = (context: NextPageContext) => {

  const { peopleId, wikiRevisionId } = context.query;

  return {
    props: { peopleId, wikiRevisionId }
  }
}

export const OldRevisionView: NextPage<Props> = ({ peopleId, wikiRevisionId }) => {
  const router = useRouter();

  const [findOneCoworker, setFindOneCoworker] = useState<FindOneCoworker>();
  const [findOneRevision, setFindOneRevision] = useState<FindOneRevision>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCoworker = await CoworkerApi.findOne(peopleId);
        const responseRevision = await WikiApi.findOneWikiRevision(wikiRevisionId);

        const { data: dataCoworker } = responseCoworker.data;
        const { data: dataRevision } = responseRevision.data;

        setFindOneCoworker(dataCoworker);
        setFindOneRevision(dataRevision);
      } catch (err: any) {
        console.log(err);
        const { status } = err.response;
        if (status === 404) {
          router.push('/people');
        }
        toast.error(err.response.data.message);
      }
    }

    fetchData();
  }, [])

  return (
    <div className={"min-h-screen p-8"}>
      <div className={"flex flex-row justify-between"}>
        <div onClick={() => { router.back() }}>
          <button className={'ring-1 flex justify-center items-center w-32 px-2 py-2 font-bold text-center text-xl select-none hover:ring-2 hover:duration-200 hover:cursor-pointer active:ring-4'}>
            <HiArrowCircleLeft/> 뒤로가기
          </button>
        </div>
        <BtnSignOut />
      </div>

      {/* 위키 본문 바디 */}
      <div className={"border rounded py-8 px-12 w-full mt-16"}>
        {/* 상단 */}
        <div className={"w-full flex flex-row justify-between"}>
          <h1 className={"font-bold text-3xl"}>{ findOneCoworker && findOneRevision && findOneCoworker.name + ` (Revision: ${findOneRevision.createdAt})` }</h1>
        </div>

        {/* 본문 */}
        { findOneRevision &&
            <div className={"mt-16"}>
                <Viewer initMarkdown={ findOneRevision && findOneRevision.wikiContent } />
            </div>
        }
      </div>
    </div>
  );
}

export default OldRevisionView;