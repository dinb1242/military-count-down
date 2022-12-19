import BtnBack from "../../../../components/buttons/btn-back";
import BtnSignOut from "../../../../components/buttons/btn-sign-out";

import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { AiFillSave } from 'react-icons/ai';
import { NextPage, NextPageContext } from 'next';
import { toast } from 'react-toastify';
import WikiApi from "../../../../apis/wiki.api";
import { WikiType } from "../../../../enums/wiki-type.enum";

const Editor = dynamic(()=> import('../../../../components/inputs/tui-editor'), { ssr : false } )

interface Props {
  projectId: number;
}

export const getServerSideProps = (context: NextPageContext) => {
  const { projectId } = context.query;
  return {
    props: { projectId }
  }
}

export const ProjectWikiCreate: NextPage<Props> = ({ projectId }) => {
    const router = useRouter();

    const [initMarkdown, setInitMarkdown] = useState('');
    const [markdownInput, setMarkdownInput] = useState<string>('');
    const handleMarkdownChange = (markdown: string) => {
      setMarkdownInput(markdown);
    }

    const handleSubmitClick = () => {
      WikiApi.update({
        bbsId: projectId,
        wikiType: WikiType.PROJECT,
        wikiContent: markdownInput
      }).then(res => {
        toast.success('위키가 편집되었습니다.');
        router.push(`/projects/wiki/${projectId}`);
      }).catch(err => {
        console.log(err);
        const { status } = err.response;
        if (status === 404) {
          router.push('/projects');
        }
        toast.error(err.response.data.message, {
          style: {
            width: '400px'
          }
        })
      })
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await WikiApi.findOneWiki(WikiType.PROJECT, projectId);
          const { data } = response.data;

          // 처음 작성되는 위키의 경우, data 가 null 이다.
          if (data) {
            // 데이터가 있을 경우, 해당 데이터를 마크다운 초기 값으로 전달한다.
            setInitMarkdown(data.wikiContent);
          }
        } catch (err) {
          router.back();
        }
      }
      fetchData();
    }, [])

    return (
        <div className={ 'min-h-screen p-8' }>
            <div className={ 'flex flex-row justify-between' }>
                <BtnBack where={'/projects/wiki/' + projectId} />
                <BtnSignOut />
            </div>

            {/* 마크다운 에디터 */}
            <div className={ 'mt-8' }>
              <Editor handleMarkdownChange={ handleMarkdownChange } initMarkdown={ initMarkdown } />
              <div className={"w-full flex justify-end"}>
                <button
                  className={
                    "flex flex-row items-center text-2xl border mr-4 px-8 py-2 bg-emerald-500 hover:bg-emerald-600 acitve:bg-emerald-700 transition duration-200 rounded-b-lg text-white font-bold"
                  }
                  onClick={ handleSubmitClick }
                >
                  <AiFillSave className={"mr-1"} /> 저장
                </button>
              </div>
            </div>
        </div>
    );
}

export default ProjectWikiCreate;