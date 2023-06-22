import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPaginate from 'react-paginate';
import { activitylog } from '../../redux/actions/profileActions';
import Loader from '../../components/microComponents/loader';

const itemsPerPage = 20;

const ActivityLog = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile.activitylogs);
  const [itemOffset, setItemOffset] = useState(1);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = store?.data?.data?.logs?.data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(store?.data?.data?.logs?.total / itemsPerPage);
  useEffect(() => {
    dispatch(activitylog({
      page: itemOffset
    }));
  }, [dispatch]);
  console.log(store?.data?.data?.logs?.data);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % store?.data?.data?.logs?.total;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  console.log('Offset ', itemOffset);
  return (
    <div className="container">
      <h2>Activity Log </h2>
      {store && store.status === 'pending'
        ? <Loader />
        : (
          <>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th>Name</th>
                  <th scope="col">Causer</th>
                  <th scope="col">IP</th>
                  <th scope="col">Description</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {store && store?.data?.data?.logs?.data.map((log, i) => (
                  <tr key={log.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{log.name}</td>
                    <td>
                      {log.causer.first_name}
                      {' '}
                      {log.causer.last_name}
                      <br />
                      {log.causer.email}
                      <br />
                      {log.causer_role}
                    </td>
                    <td>{log.ip}</td>
                    <td>{log.description}</td>
                    <td>{log.created_at}</td>
                    <td>@mdo</td>
                  </tr>
                ))}

              </tbody>
            </table>

            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
            />
          </>

        )}
    </div>
  );
};

export default ActivityLog;
