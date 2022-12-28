import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef, useState } from "react";
import { HookCallback } from "@toast-ui/editor/types/editor";
import FileApi from "../../apis/file.api";
import { NextPage } from "next";
import { AxiosError } from "axios";
import AlertModal from "../modals/alert.modal";

interface Props {
  handleMarkdownChange: (markdown: string) => void;
  initMarkdown?: string;
}

const TuiEditor: NextPage<Props> = ({handleMarkdownChange, initMarkdown}) => {

  const [isOpenModal, setIsOpenModal] = useState(false);

  const editorRef = useRef<any>(null);
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"],
    ["code"],
    ["scrollSync"],
  ];

  const handleChange = () => {
    const editorIns = editorRef.current.getInstance();
    const contentMarkdown = editorIns.getMarkdown();

    handleMarkdownChange(contentMarkdown);
  };

  useEffect(() => {
    // 마크다운 초기화
    if (initMarkdown) {
      const editorIns = editorRef.current.getInstance();
      editorIns.setMarkdown(initMarkdown);
    }
  }, [initMarkdown])

  const handleModal = ()=> {
    setIsOpenModal((prev) => !prev);
  };

  return (
    <>
      <div className={"w-full"}>
        <AlertModal handleModal={handleModal} isOpen={isOpenModal} title={'파일 업로드 실패'} content={'파일은 최대 2MB 까지 업로드할 수 있습니다.'} />
        <Editor
          ref={editorRef}
          initialValue={initMarkdown ? initMarkdown : ''} // 글 수정 시 사용
          initialEditType="markdown" // wysiwyg & markdown
          hideModeSwitch={true}
          height="500px"
          theme={""} // '' & 'dark'
          usageStatistics={false}
          toolbarItems={toolbarItems}
          previewStyle={"vertical"}
          onChange={handleChange}
          customHTMLRenderer={{
            heading(node: any, ctx: any) {
              return {
                type: ctx.entering ? 'openTag' : 'closeTag',
                tagName: `h${node.level}`,
                attributes: {
                  id: node.firstChild?.type === 'text' ? node.firstChild?.literal.replaceAll(' ', '-') : node.firstChild?.type
                }
              };
            },
          }}
          autofocus={ false }
          hooks={{
            addImageBlobHook: async (
              blob: Blob | File,
              callback: HookCallback
            ) => {
              try {
                const formData = new FormData();
                formData.append("file", blob);
                const response: any = await FileApi.markdownUpload(formData);
                let path: string = response.data.data;
                path = path.replace("\\", "/");
                callback(path, "image");
                return false;
              } catch (err) {
                if (err instanceof AxiosError) {
                  console.log(err);
                  handleModal();
                  return false;
                }
              }
            },
          }}
        />
      </div>
    </>
  );
};
export default TuiEditor;
