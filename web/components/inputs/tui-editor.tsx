import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";
import { HookCallback } from "@toast-ui/editor/types/editor";
import FileApi from "../../apis/file.api";
import { NextPage } from "next";

interface Props {
  handleMarkdownChange: (markdown: string) => void;
  initMarkdown?: string;
}

const TuiEditor: NextPage<Props> = ({handleMarkdownChange, initMarkdown}) => {

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

  return (
    <>
      <div className={"w-full"}>
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
              const formData = new FormData();
              formData.append("file", blob);
              const response: any = await FileApi.markdownUpload(formData);
              let path: string = response.data.data;
              path = path.replace("\\", "/");
              callback(path, "image");
              return false;
            },
          }}
        />
      </div>
    </>
  );
};
export default TuiEditor;
