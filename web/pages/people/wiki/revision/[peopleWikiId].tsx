import BtnBack from '../../../../components/buttons/btn-back';
import BtnSignOut from '../../../../components/buttons/btn-sign-out';
import { NextPage, NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import CoworkerApi from '../../../../apis/coworker.api';
import Link from 'next/link';
import WikiApi from "../../../../apis/wiki.api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { BtnScrollToTop } from "../../../../components/buttons/btn-scroll-to-top";

interface Props {
  peopleId: number;
  peopleWikiId: number;
}

interface FindAllRevisions {
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

interface FindCoworker {
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
  const { peopleId, peopleWikiId } = context.query;

  return {
    props: { peopleId, peopleWikiId }
  }
}

export const PeopleWikiRevision: NextPage<Props> = ({ peopleId, peopleWikiId }) => {
  const router = useRouter();

  const [findAllRevisions, setFindAllRevisions] = useState<FindAllRevisions[]>();
  const [findCoworker, setFindCoworker] = useState<FindCoworker>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await WikiApi.findAllWikiRevisions(peopleWikiId);
        const responseCoworker = await CoworkerApi.findOne(peopleId);
        const { data } = response.data;
        const { data: dataCoworker } = responseCoworker.data;

        setFindAllRevisions(data);
        setFindCoworker(dataCoworker);
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
    <div className={ 'min-h-screen p-8' }>
      <div className={"flex flex-row justify-between"}>
        <BtnBack where={"/people/wiki/" + peopleId} />
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
                    <Link href={'/people/wiki/revision/old/' + peopleId + '/' + eachRevision.id } >
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

export default PeopleWikiRevision;