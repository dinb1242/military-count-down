import BtnBack from "../../../components/buttons/btn-back";
import BtnSignOut from "../../../components/buttons/btn-sign-out";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import WikiApi from "../../../apis/wiki.api";

const Viewer = dynamic(() => import("../../../components/inputs/tui-viewer"), {
  ssr: false,
});

interface FindOneWiki {
  id: number;
  coworkerId: number;
  name: string;
  wikiContent: string;
  createdAt: string;
  updatedAt: string;
}

export const AccidentWiki = () => {
  const router = useRouter();

  const [findOneWiki, setFindOneWiki] = useState<FindOneWiki>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseWiki = await WikiApi.findOneAccidentWiki();
        const { data: dataWiki } = responseWiki.data;

        setFindOneWiki(dataWiki === null ? '' : dataWiki);
      } catch (err) {
        console.log(err);
        router.push('/accident/wiki/edit')
      }
    };

    fetchData();
  }, []);

  return (
    <div className={"min-h-screen p-8"}>
      <div className={"flex flex-row justify-between"}>
        <BtnBack where={"/"} />
        <BtnSignOut />
      </div>

      {/* 위키 본문 바디 */}
      <div className={'flex justify-center'}>
        <div className={"border rounded py-8 px-12 w-full lg:w-1/2 mt-16"}>
          {/* 상단 */}
          <div className={"w-full flex flex-row justify-between"}>
            <h1 className={"font-bold text-3xl"}>사건/사고</h1>
            <div>
              {
                findOneWiki &&
                <Link href={"/accident/wiki/revision/" + findOneWiki.id} >
                  <a className={ 'hover:text-blue-500' }>역사</a>
                </Link>
              }
              <span> | </span>
              <Link href={"/accident/wiki/edit/"}>
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
    </div>
  );
};

export default AccidentWiki;
