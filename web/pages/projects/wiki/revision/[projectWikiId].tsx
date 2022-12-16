import BtnBack from '../../../../components/buttons/btn-back';
import BtnSignOut from '../../../../components/buttons/btn-sign-out';
import { NextPage, NextPageContext } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import WikiApi from "../../../../apis/wiki.api";
import ProjectApi from "../../../../apis/project.api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface Props {
  projectId: number;
  projectWikiId: number;
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

interface FindOneProject {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const getServerSideProps = (context: NextPageContext) => {
  const { projectId, projectWikiId } = context.query;

  return {
    props: { projectId, projectWikiId }
  }
}

export const ProjectWikiRevision: NextPage<Props> = ({ projectId, projectWikiId }) => {
  const router = useRouter();

  const [findAllRevisions, setFindAllRevisions] = useState<FindAllRevisions[]>();
  const [findOneProject, setFindOneProject] = useState<FindOneProject>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await WikiApi.findAllWikiRevisions(projectWikiId);
        const responseCoworker = await ProjectApi.findOne(projectId);
        const { data } = response.data;
        const { data: dataCoworker } = responseCoworker.data;

        setFindAllRevisions(data);
        setFindOneProject(dataCoworker);
      } catch (err: any) {
        console.log(err);
        const { status } = err.response;
        if (status === 404) {
          router.push('/projects');
        }
        toast.error(err.response.data.message);
      }
    }
    fetchData();
  }, [])

  return (
    <div className={ 'min-h-screen p-8' }>
      <div className={"flex flex-row justify-between"}>
        <BtnBack where={"/projects/wiki/" + projectId} />
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
                    <Link href={'/projects/wiki/revision/old/' + projectId + '/' + eachRevision.id } >
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
    </div>
  )
}

export default ProjectWikiRevision;