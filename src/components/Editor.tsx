import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IEditor } from '../types/interface';
import { useMemo } from 'react';

export const Editor = ({ value, setValue, readOnly }: IEditor) => {
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'width',
  ];

  const modules = useMemo(() => {
    if (readOnly) {
      return {
        toolbar: false,
      };
    }
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
        ],
      },
    };
  }, [readOnly]);
  return (
    <ReactQuill
      className={`m-auto mb-10 sm:w-full md:w-4/5 h-80 placeholder:text-white ${readOnly && 'editor-radius'}`}
      theme='snow'
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
      readOnly={readOnly}
    />
  );
};

export default Editor;
