
import ReactQuill from 'react-quill';
import { styled } from 'styled-components';


const InputTextEditor = ({value, onChange }: {value: string, onChange: any}) => {
  return (
    <ReactQuillStyled 
      value={value}
      onChange={onChange}
      theme="snow" 
      modules={{
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
            {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
        clipboard: {
          matchVisual: false,
        }}}
      formats={[
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]}
      />
  );
};

export default InputTextEditor;

const ReactQuillStyled = styled(ReactQuill)`
  border-radius: 4px;
  border: 1px solid #d9d9d9;

  .ql-toolbar  {
    border-radius: 3px 3ppx 0 0;
    background-color: lightgray;
  }
  .ql-editor {
    min-height: 140px;
  }

  .ql-container  {
    overflow-y: scroll;
    max-height: 160px;
    border-top: 1px solid #d9d9d9 !important;
  }
  .ql-snow {
    border: none;
  }
`;