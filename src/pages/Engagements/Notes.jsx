import React, { useState } from 'react';
import {
  useHistory, useParams
} from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { useSelector, connect } from 'react-redux';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import Loader from '../../components/microComponents/loader';
import PageTemp from '../../components/temps/PageTemp';
import NoNotesTemp from './temps/notes/NoNotesTemp';
import AddNotesTemp from './temps/notes/AddNotesTemp';

const Notes = ({ link, store }) => {
  const { push } = useHistory();
  /* redux hooks */
  // const store = useSelector((state) => state.engagement?.notes);
  const storex = useSelector((state) => state.engagement?.engagement);
  /* state */
  const [notes, setNotes] = useState([]);
  const [addNote, setAddNote] = useState(false);
  const { engagementId } = useParams();

  /* boilerPlate hooks params */
  const options = {
    action: 'NOTES',
    apiOpts: apiOptions({
      endpoint: 'ENGAGEMENT',
      auth: true,
      param: engagementId,
      afterParam: 'notes',
      method: 'get'
    })
  };
  /* boilerPlate hooks */
  const {
    view, status, data
  } = useViewBoilerPlate({
    setFormData: setNotes,
    formData: notes,
    store,
    options
  });

  return (
    <div className="w-100">
      <div className="d-flex custom-top-bar-borderless left-14-neg min-w-300-w justify-content-between bg-white">
        <div className="text-theme-black font-title-small">
          Activities Note
        </div>
        <button type="button" className="font-title-small bg-theme-light text-theme">
          <HiOutlineChevronRight className="mt-2" />
        </button>
      </div>
      <PageTemp
        status={status}
        noDataTemp={(
          <div>
            {
              addNote
                // eslint-disable-next-line max-len
                ? <AddNotesTemp engagementId={engagementId} stageId={storex?.data?.data?.engagement?.status} />
                : <NoNotesTemp setAdd={setAddNote} />
            }
          </div>
        )}
        data={data?.notes}
        retry={view}
        view={(
          <div>
            {
              addNote
                ? (
                  <AddNotesTemp
                    engagementId={engagementId}
                    stageId={storex?.data?.data?.engagement?.status}
                  />
                )
                : (
                  <div>
                    {data && data.notes.map((note, i) => (
                      <p key={note.id} dangerouslySetInnerHTML={{ __html: note.message }} />
                    ))}
                  </div>
                )
            }
          </div>
        )}
      />
    </div>
  );
};

function mapStateToProps(state) {
  const { engagement } = state;
  console.log('Toddddo ', engagement.notes);
  return { store: engagement.notes };
}

export default connect(mapStateToProps)(Notes);
