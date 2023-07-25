import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { apiOptions } from '../../../../services/fetch';
import useViewBoilerPlate from '../../../../components/hooks/useViewBoilerPlate';
import DragNDropTemp from '../../temps/newEngagement/DragNDropInputTemp';

const EditClass = () => {
  /* redux hooks */
  const store = useSelector((state) => state.engagement?.engagement);

  /* router hooks */
  const { engagementId, engagementName } = useParams();
  /* state */
  const [formData, setFormData] = useState({ });
  const [open, setOpen] = useState(false);

  /* boilerPlate hooks params */
  const options = {
    action: 'ENGAGEMENT',
    apiOpts: apiOptions({
      endpoint: 'ENGAGEMENT',
      auth: true,
      param: engagementId,
      method: 'get'
    })
  };

  /* boilerPlate hooks */
  const { status } = useViewBoilerPlate({
    setFormData,
    formData,
    store,
    options
  });
  //   const { engagement: { planning } } = formData;
  //   console.log('View Engangmentinfo ', planning);

  return (
    <div>
      <form>
        <div className="px-2">

          {/* <DragNDropTemp
            formData={formData}
            setFormData={setFormData}
            // setErrors={setErrors}
            name="process_flow_document"
            label="Process Flow Document"
          /> */}
        </div>
      </form>
    </div>
  );
};

export default EditClass;
