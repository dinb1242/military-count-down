import BtnBack from "../../../components/buttons/btn-back";
import BtnSignOut from "../../../components/buttons/btn-sign-out";
import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import CoworkerApi from "../../../apis/coworker.api";
import { useRouter } from 'next/router';
import WikiApi from "../../../apis/wiki.api";
import { WikiType } from "../../../enums/wiki-type.enum";
import { toast } from "react-toastify";

const Viewer = dynamic(() => import("../../../components/inputs/tui-viewer"), {
  ssr: false,
});

interface Props {
  peopleId: number;
}

interface FindOneCoworker {
  id: number;
  name: string;
  devPart: string;
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
  const { peopleId } = context.query;

  return {
    props: { peopleId },
  };
};

export const PeopleWiki: NextPage<Props> = ({ peopleId }) => {
  const router = useRouter();

  const [findOneCoworker, setFindOneCoworker] = useState<FindOneCoworker>();
  const [findOneWiki, setFindOneWiki] = useState<FindOneWiki>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCoworker = await CoworkerApi.findOne(peopleId);
        const responseWiki = await WikiApi.findOneWiki(WikiType.COWORKER, peopleId);
        const { data: dataWiki } = responseWiki.data;
        const { data: dataCoworker } = responseCoworker.data;

        setFindOneCoworker(dataCoworker === null ? '' : dataCoworker);
        setFindOneWiki(dataWiki === null ? '' : dataWiki);
      } catch (err: any) {
        console.log(err);
        const { status } = err.response;
        if (status === 404) {
          router.push('/people');
        }
        toast.error(err.response.data.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={"min-h-screen p-8"}>
      <div className={"flex flex-row justify-between"}>
        <BtnBack where={"/people"} />
        <BtnSignOut />
      </div>

      {/* 위키 본문 바디 */}
      <div className={"border rounded py-8 px-12 w-full mt-16"}>
        {/* 상단 */}
        <div className={"w-full flex flex-row justify-between"}>
          <h1 className={"font-bold text-3xl"}>{ findOneCoworker && findOneCoworker.name }</h1>
          <div>
            {
              findOneWiki &&
                <Link href={"/people/wiki/revision/" + findOneWiki.id + '?peopleId=' + peopleId} >
                    <a className={ 'hover:text-blue-500' }>역사</a>
                </Link>
            }
            <span> | </span>
            <Link href={"/people/wiki/edit/" + peopleId}>
              <a className={ 'hover:text-blue-500' }>편집</a>
            </Link>
          </div>
        </div>

        {/* 본문 */}
        { findOneWiki &&
            <div className={"mt-16"}>
                <Viewer initMarkdown={ findOneWiki && findOneWiki.wikiContent } />
            </div>
        }
      </div>
    </div>
  );
};

export default PeopleWiki;
