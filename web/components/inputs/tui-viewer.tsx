import "@toast-ui/editor/dist/toastui-editor.css";

import { Viewer } from '@toast-ui/react-editor';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

interface Props {
  initMarkdown?: string;
}

const TuiViewer: NextPage<Props> = ({ initMarkdown }) => {
  return <Viewer initialValue={ initMarkdown ? initMarkdown : '' }  />
}

export default TuiViewer;