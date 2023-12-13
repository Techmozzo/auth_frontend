import React, { useState, useEffect } from 'react';
import {
  useHistory, useParams
} from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi';
import { useSelector, connect, useDispatch } from 'react-redux';
import { apiOptions } from '../../services/fetch';
import useViewBoilerPlate from '../../components/hooks/useViewBoilerPlate';
import Loader from '../../components/microComponents/loader';
import PageTemp from '../../components/temps/PageTemp';
import NoNotesTemp from './temps/notes/NoNotesTemp';
import AddNotesTemp from './temps/notes/AddNotesTemp';
import { projectAction } from '../../redux/actions/projectActions';
import useIndex from '../../components/hooks/useIndex';

const indexData = { ...JSON.parse(localStorage.getItem('index')) };
const Notes = ({ link, store, fstore }) => {
  const { push } = useHistory();
  /* redux hooks */
  // const store = useSelector((state) => state.engagement?.notes);
  const dispatch = useDispatch();
  const storex = useSelector((state) => state.engagement?.engagement);
  const enguagement = useSelector((state) => state.engagement?.dashboard?.data?.data);
  const indexstore = useSelector((state) => state.engagement);
  /* state */
  const [notes, setNotes] = useState([]);
  const [addNote, setAddNote] = useState(false);
  const { engagementId } = useParams();
  const { planning, loading } = useIndex();
  // useEffect(() => {
  //   dispatch(projectAction({
  //     action: 'INDEX',
  //     routeOptions: apiOptions({
  //       endpoint: 'INDEX',
  //       auth: true,
  //       method: 'get'
  //     })
  //   }));
  // }, [dispatch]);
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
  console.log('Note In', indexstore);
  // const [formDatax, setFormDatax] = React.useState({});

  // const optionsx = {
  //   action: 'INDEX',
  //   apiOpts: apiOptions({
  //     endpoint: 'INDEX',
  //     auth: true,
  //     method: 'get'
  //   })
  // };
  // const vic = useViewBoilerPlate({
  //   setFormData: setFormDatax,
  //   formData: formDatax,
  //   store: fstore,
  //   options: optionsx
  // });

  console.log('Index ', storex?.data?.data?.engagement?.status?.id);
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
                ? <AddNotesTemp engagementId={engagementId} stageId={storex?.data?.data?.engagement?.status?.id} />
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
                    stageId={storex?.data?.data?.engagement?.status?.id}
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
  return { store: engagement.notes, fstore: engagement.index };
}

export default connect(mapStateToProps)(Notes);
