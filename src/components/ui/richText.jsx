import React, { useEffect, useState, useRef } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.bubble.css';
// import 'react-quill/dist/quill.snow.css';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const QuillEditorBubble = ({
  setFormData, name, formData, handleBlur, values
}) => {
  const [value, setValue] = useState(values || '');
  const handleData = () => setFormData({
    ...formData,
    [name]: value
  });
  const editorRef = useRef();

  useEffect(() => {
    handleData();
  }, [value]);

  useEffect(() => {
    ClassicEditor.create(editorRef.current, {
      toolbar: {
        items: [
          'undo', 'redo',
          '|', 'heading',
          '|', 'bold', 'italic',
          '|', 'link', 'blockQuote',
          '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
        ],
        removeItems: ['uploadImage', 'mediaUpload'],
        shouldNotGroupWhenFull: false
      },
      theme: 'snow'
    })
      .then((editor) => {
        editor.model.document.on('change:data', () => {
          const data = editor.getData();
          setValue(data);
        });
        editor.editing.view.document.on('blur', () => {
          // handleBlur();
          console.log('blur');
        });
      })
      .catch((error) => {
        console.error('Error initializing editor:', error);
      });

    return () => {
      if (editorRef.current) {
        ClassicEditor.destroy(editorRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="font-tinier text-theme-faint">Work here or click button below to attach file</div>
      {/* <ReactQuill onBlur={handleBlur} theme="snow" value={value} onChange={setValue} /> */}
      <div ref={editorRef} />
    </div>
  );
};
export const QuillEditor = ({ value, handleSetValue, theme }) => {
  const [setValues] = useState(value || '');
  const editor2Ref = useRef();

  useEffect(() => {
    ClassicEditor.create(editor2Ref.current, {
      toolbar: {
        items: ['undo', 'redo', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList', 'blockQuote', '|', 'link']
      },
      theme
    })
      .then((editor) => {
        editor.model.document.on('change:data', () => {
          const data = editor.getData();
          setValues(data);
          handleSetValue(data);
        });
      })
      .catch((error) => {
        console.error('Error initializing editor:', error);
      });

    return () => {
      if (editor2Ref.current) {
        ClassicEditor.destroy(editor2Ref.current);
      }
    };
  }, []);

  return (
  // <ReactQuill theme={theme} value={value} onChange={handleSetValue} />
    <div ref={editor2Ref} />
  );
};
