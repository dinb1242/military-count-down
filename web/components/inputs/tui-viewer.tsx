import "@toast-ui/editor/dist/toastui-editor.css";

import { Viewer } from '@toast-ui/react-editor';
import { NextPage } from 'next';

interface Props {
  initMarkdown?: string;
}

const TuiViewer: NextPage<Props> = ({ initMarkdown }) => {
  return <Viewer
    initialValue={ initMarkdown ? initMarkdown : '' }
    customHTMLRenderer={{
      heading(node: any, ctx: any) {
        return {
          type: ctx.entering ? 'openTag' : 'closeTag',
          tagName: `h${node.level}`,
          attributes: {
            id: node.firstChild?.literal.replace(' ', '-')
          }
        };
      },
    }}
  />
}

export default TuiViewer;