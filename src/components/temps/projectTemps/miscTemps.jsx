import React, { useRef } from 'react';
import uuid from 'react-uuid';
import { Link } from 'react-router-dom';
import ProgressBar from '../../microComponents/circularProgress';
import {
  dragHandler,
  dragInHandler, dragOutHandler, dropHandler
} from '../../../utilities/handlers';
import { sentenceCaps, stringDoesNotExist } from '../../../utilities/stringOperations';
import Dash from '../../../pages/Dashboard/Dash';

export const ImageWrapper = ({ upload, removeItem }) => (
  <>
    <img
      src={
        upload.uri
      }
      className="h-7h"
      alt={upload}
    />
    <button onClick={() => removeItem(upload)} type="button" className="text-white btn-sm btn-danger radius50  remove-media">x</button>

  </>
);
export const ProgressWrapper = ({ progress }) => (
  <ProgressBar
    progress={progress}
    size={80}
    strokeWidth={3}
    circleOneStroke="#f1ecf3b0"
    circleTwoStroke="#A01B88"
  />
);

export const DragAndDropUploader = ({ handleDrop, uploads }) => {
  const [dragging, setDragging] = React.useState(false);
  const [dragCounter, setDragCounter] = React.useState(false);
  const dropRef = useRef();
  return (
    <div
      className="h-7h"
      ref={dropRef.current}
      onDragEnter={(e) => dragInHandler(e, dragCounter, setDragCounter, setDragging)}
      onDragLeave={(e) => dragOutHandler(e, dragCounter, setDragCounter, setDragging)}
      onDrop={(e) => dropHandler(e, dragCounter, setDragCounter, setDragging, handleDrop)}
      onDragOver={(e) => dragHandler(e)}
    >
      <div
        className=""
      >
        {dragging
          ? (
            <div>
              <div>
                <div>drop here </div>
              </div>
            </div>
          )
          : (
            <div>
              Drop files or click button below
              <div className="row max-h-100 scroll-y drop-box">
                <div className="text-theme-blue theme-font-2 font-tinier" key={uploads}>{uploads}</div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export const InfoBarTemp = ({ data }) => (
  <Dash indexstore={data} />

);

/* remember to add class 'path' to the icon element so you don't say ooooh God  !!! */
export const animatedCheck = (icon) => (
  <div className="animated-check-wrapper">
    <svg className="animated-check" viewBox="0 0 24 24">
      {icon}
    </svg>
  </div>
);

export const headerTemp1 = ({
  name, text, link, link1, parent, year
}) => (
  <div className="d-flex ml-4 custom-top-bar justify-content-between">
    <div className="">
      <span
        className="theme-font-bold font-title-small text-theme-black mr-1"
      >
        {sentenceCaps(name)}
      </span>
      <span className={stringDoesNotExist(year) ? 'd-none' : 'mr-1'}>{year}</span>
    </div>
    <div>
      <Link to={link} className="text-theme-blue mr-1">{parent}</Link>
      <Link
        to={link1}
        className={stringDoesNotExist(link1) ? 'd-none' : 'text-theme-blue mr-1'}
      >
        {`/${sentenceCaps(name)}`}
      </Link>
      <span className="text-theme-black">{`/${text}`}</span>
    </div>
  </div>
);
