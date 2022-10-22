import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import {useState} from "react";

export const MarkdownEditor = () => {

    const [text, setText] = useState('# 마크다운 에디터');

    return <MdEditor modelValue={text} onChange={ setText } language={ 'en-US' } />;
}

export default MarkdownEditor;