import React from 'react';
import { isFunction } from 'lodash';
import {
  useHistory
} from 'react-router-dom';
import { noDataSvg } from '../../utilities/dummyData';
import { stringDoesNotExist } from '../../utilities/stringOperations';

const NoData = ({
  link, name, text, title, btnName, callback
}) => {
  const { push } = useHistory();
  return (
    <div className="w-100">
      {
        !stringDoesNotExist(name) && (
          <div className="d-flex ml-4 custom-top-bar justify-content-between">
            <div className="text-theme-black bold">
              {name?.toUpperCase()}
            </div>
          </div>
        )
      }
      <div className="max-w-350 margin-center">
        <div className="text-center">
          {noDataSvg}
          <div className="text-theme-black font-title-small bold" style={{ marginTop: '10px' }}>
            {title || ''}
          </div>
          <div className="text-theme-faint text-center" style={{ marginTop: '10px' }}>
            {text || ''}
          </div>
          <button className="btn" type="button" onClick={() => (isFunction(callback) ? callback() : push(link))} style={{ marginTop: '20px' }}>
            {btnName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoData;
