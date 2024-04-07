import React from 'react';
import DOMPurify from 'dompurify';
import renderHTML from 'react-render-html';
import { IoMdCloudDownload } from 'react-icons/io';

const DisplayContent = ({ contents }) => {
  // Helper function to determine the type of content based on the string
  const getContentType = (content) => {
    // Check if the content is an image based on the file extension
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = content.substring(content.lastIndexOf('.')).toLowerCase();
    if (imageExtensions.includes(fileExtension)) {
      return 'image';
    }

    // Check if the content is a file based on the file extension
    const fileExtensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.txt'];
    if (fileExtensions.includes(fileExtension)) {
      return 'file';
    }

    // If the content doesn't match any known file extensions, assume it's plain text
    return 'text';
  };

  const contentType = getContentType(contents);

  if (contentType === 'image') {
    return <img src={contents} alt="Image" style={{ width: '100px' }} />;
  }

  if (contentType === 'file') {
    return (
      <div>
        <a href={contents} target="_blank" rel="noopener noreferrer">
          Download File
          <span className="mt-1 ml-2">
            <IoMdCloudDownload style={{ color: '#202020' }} />
          </span>
        </a>
      </div>
    );
  }

  const cleanContent = DOMPurify.sanitize(contents, { USE_PROFILES: { html: true } });

  return (
    <div>{renderHTML(cleanContent)}</div>
  );
};

export default DisplayContent;
