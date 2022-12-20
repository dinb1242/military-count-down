import BtnBack from '../../../../components/buttons/btn-back';
import BtnSignOut from '../../../../components/buttons/btn-sign-out';
import { NextPage, NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import WikiApi from "../../../../apis/wiki.api";
import { BtnScrollToTop } from "../../../../components/buttons/btn-scroll-to-top";

interface Props {
  accidentWikiId: number;
}

interface FindAllRevisions {
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

export const getServerSideProps = (context: NextPageContext) => {
  const { accidentWikiId } = context.query;

  return {
    props: { accidentWikiId }
  }
}

export const AccidentWikiRevision: NextPage<Props> = ({ accidentWikiId }) => {

  const [findAllRevisions, setFindAllRevisions] = useState<FindAllRevisions[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await WikiApi.findAllWikiRevisions(accidentWikiId);
        const { data } = response.data;

        setFindAllRevisions(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])

  return (
    <div className={ 'min-h-screen p-8' }>
      <div className={"flex flex-row justify-between"}>
        <BtnBack where={"/accident/wiki"} />
        <BtnSignOut />
      </div>
      
      <div className="overflow-x-auto w-full flex flex-col items-center mt-16">
        <span className={'text-3xl font-bold'}>역 사</span>
        <table className="table w-1/3 mt-8">
          {/* Head */}
          <thead>
          <tr>
            <th>작성자</th>
            <th>수정일</th>
            <th>해당 리비전 보기</th>
          </tr>
          </thead>
          <tbody>
          {/* Row 1 */}
          {
            findAllRevisions &&
            findAllRevisions.map(eachRevision => {
              return (
                <tr key={ eachRevision.id }>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{ eachRevision.author.name }</div>
                        <span className="badge badge-ghost badge-sm">{ eachRevision.author.email }</span>
                      </div>
                    </div>
                  </td>
                  <td>{ eachRevision.createdAt }</td>
                  <th>
                    <Link href={'/accident/wiki/revision/old/' + eachRevision.id } >
                      <a>
                        <button className="btn btn-ghost btn-xs">보기</button>
                      </a>
                    </Link>
                  </th>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
      <BtnScrollToTop />
    </div>
  )
}

export default AccidentWikiRevision;