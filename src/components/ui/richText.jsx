import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

export const QuillEditorBubble = ({
  setFormData, name, formData, handleBlur, values
}) => {
  const [value, setValue] = useState(values || '');
  const handleData = () => setFormData({
    ...formData,
    [name]: value
  });
  useEffect(() => {
    handleData();
  }, [value]);
  return (
    <div>
      <div className="font-tinier text-theme-faint">Work here or click button below to attach file</div>
      <ReactQuill onBlur={handleBlur} theme="snow" value={value} onChange={setValue} />
    </div>
  );
};
export const QuillEditor = ({ value, handleSetValue, theme }) => (
  <ReactQuill theme={theme} value={value} onChange={handleSetValue} />
);
