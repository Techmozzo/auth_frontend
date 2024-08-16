import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPaginate from 'react-paginate';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { activitylog } from '../../redux/actions/profileActions';
import { sentenceCaps } from '../../utilities/stringOperations';
import { getCurrentDateTime } from '../../utilities/dateOperations';

const itemsPerPage = 20;

const useStyles = makeStyles((theme) => ({
  table: {
    overflowY: 'auto',
    borderCollapse: 'separate',
    borderSpacing: '0 1em'
  },
  tableRow: {
    borderBottom: '1px solid rgb(151, 151, 151, 0.4)'
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#393939',
    fontSize: '13px',
    fontWeight: 500,
    padding: '8px 16px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
    padding: '8px 16px'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#ffffff'
}));

const LargeSpinner = styled('i')({
  fontSize: '1rem'
});

const ActivityLog = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile.activitylogs);
  const [itemOffset, setItemOffset] = useState(1);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = store?.data?.data?.logs?.data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(store?.data?.data?.logs?.total / itemsPerPage);
  useEffect(() => {
    dispatch(activitylog({
      page: itemOffset
    }));
  }, [dispatch]);
  // console.log(store?.data?.data?.logs?.data);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % store?.data?.data?.logs?.total;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  // console.log('Offset ', itemOffset);
  const classes = useStyles();
  return (
    <div className="container">
      <>
        <h2>Activity Log </h2>
        <TableContainer component={Box}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table" className={classes.table}>
            <TableHead sx={{ borderBottom: '3px solid #e0e0e0' }}>
              <TableRow className={classes.tableRow}>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Causer</StyledTableCell>
                <StyledTableCell align="left">IP</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="left">Created At</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!store && store.status === 'pending'
                ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                        <LargeSpinner className="pi pi-spin pi-spinner" />
                      </Box>
                    </TableCell>
                  </TableRow>
                )
                : store && store?.data?.data?.logs?.data?.map((row, i) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      <div className="bold theme-font font-small">{i + 1}</div>
                    </StyledTableCell>
                    <StyledTableCell align="left"><div className="theme-font-2">{row.name}</div></StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="theme-font-2">
                        {sentenceCaps(row.causer.first_name)}
                        {' '}
                        {sentenceCaps(row.causer.last_name)}
                        <br />
                        {sentenceCaps(row.causer.email)}
                        <br />
                        {sentenceCaps(row.causer_role)}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="left"><div className="theme-font-2">{sentenceCaps(row.ip)}</div></StyledTableCell>
                    <StyledTableCell align="left"><div className="theme-font-2">{sentenceCaps(row.description)}</div></StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="theme-font-2">{getCurrentDateTime(row.created_at)}</div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default ActivityLog;
