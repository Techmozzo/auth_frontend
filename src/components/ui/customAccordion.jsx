import * as React from 'react';
import { FcCollapse, FcExpand } from 'react-icons/fc';
import Box from '@material-ui/core/Box';

const CustomAccordion = ({
  data, removeAccordion, panel, currentPanel, setCurrentPanel, className, collapse, expand
}) => {
  const handleClick = () => {
    setCurrentPanel(panel === currentPanel ? 0 : panel);
  };
  return (
    <Box className={`${className} custom-card`}>
      <Box className="my-3 pointer" onClick={handleClick}>
        <div className="d-flex justify-content-between">
          <Box>
            {data.name}
          </Box>
          <div>
            {removeAccordion}
          </div>
          <div className="">
            <button type="button" onClick={handleClick} className="border-bottom btn-plain border-radius-5">
              {
                panel === currentPanel
                  ? collapse || <FcCollapse />
                  : expand || <FcExpand />
              }
            </button>
          </div>
        </div>
      </Box>
      <div className={currentPanel === panel ? '' : 'd-none'}>
        {data.details}
      </div>
    </Box>
  );
};

export default CustomAccordion;
