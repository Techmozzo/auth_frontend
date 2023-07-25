/* eslint-disable max-len */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { useHistory } from 'react-router';
import { CgArrowsExpandDownLeft, CgArrowsExpandUpRight } from 'react-icons/cg';
// import Button from '@mui/material/Button';
import { IconButton } from '@material-ui/core';
// import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MdOutlineMoreVert } from 'react-icons/md';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import usePermission from '../hooks/usePermission';
import { sentenceCaps } from '../../utilities/stringOperations';
import { del } from '../../services/fetch';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgb(249 249 249)',
    color: '#828282',
    fontWeight: 600
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));
export default function DashboardTable({ data }) {
  const editEnganagment = usePermission('edit-engagement');
  const menuLeft = React.useRef(null);
  const { push } = useHistory();
  const toast = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  function createData(name, date, client, members, status, id) {
    return {
      name,
      date,
      client,
      members,
      status,
      id,
      action: [
        {
          label: 'Options',
          items: [
            {
              label: 'View Engangment',
              icon: 'pi pi-refresh',
              command: () => {
                console.log('CLicked');
                console.log(id);
                // viewRow(id);
                // toast.current.show({
                //   severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000
                // });
              }
            },
            {
              label: 'Edit Engangment',
              icon: 'pi pi-times',
              command: () => {
                console.log('CLicked');
                // toast.current.show({
                //   severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000
                // });
              }
            },
            {
              label: 'Delete Engangment',
              icon: 'pi pi-times',
              command: () => {
                console.log('CLicked');
                handleRow(id);
                // toast.current.show({
                //   severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000
                // });
              }
            }
          ]
        }
      ]

    };
  }
  const rows = data?.map((item) => createData(
    item?.name, item?.year, item?.client?.name, item?.team_members_count, item?.status?.name, item?.id
  ));
  console.log('Row ', data);
  const handleRow = (row) => {
    // const theData = data.filter((item) => item.name === row.name);
    push(`/app/engagement/engagement/${row}`);
  };
  const viewRow = (row) => {
    // const theData = data.filter((item) => item.name === row.name);
    push(`/app/engagement/view/${row}`);
    console.log('cliers', row);
  };
  // console.log('Den ', data);
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const acceptDelete = async (id) => {
    setLoading(true);
    try {
      const res = await del({ endpoint: 'ENGAGEMENT', param: id, auth: true });
      console.log(res);
      toast.current.show({
        severity: 'info', summary: 'Confirmed', detail: 'Engangment deleted', life: 3000
      });
      setLoading(false);
      window.location.reload(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const confirm1 = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Are you sure you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => acceptDelete(id)
    });
  };
  return (
    <TableContainer component={Box}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
            <StyledTableCell align="right">Client</StyledTableCell>
            <StyledTableCell align="right">No. of Member</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <StyledTableRow key={sentenceCaps(row.name)}>
              <StyledTableCell component="th" scope="row">
                <div className="bold theme-font font-small">{sentenceCaps(row.name)}</div>
              </StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{row.date}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{sentenceCaps(row.client)}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{sentenceCaps(row.members)}</div></StyledTableCell>
              <StyledTableCell align="right"><div className="theme-font-2">{sentenceCaps(row.status)}</div></StyledTableCell>
              <StyledTableCell align="right">
                <Menu model={row.action} popup ref={menuLeft} id="popup_menu_left" />
                <Toast ref={toast} />
                <ConfirmPopup />
                <Button icon="pi pi-eye" className="mr-2" rounded text onClick={() => viewRow(row.id)} aria-controls="popup_menu_left" aria-haspopup />
                {editEnganagment
                  && (
                    <>
                      <Button icon="pi pi-file-edit" className="mr-2" rounded text onClick={() => handleRow(row.id)} aria-controls="popup_menu_left" aria-haspopup />
                      {loading
                        ? <i className="pi pi-spin pi-spinner mr-2" />
                        : <Button icon="pi pi-trash" className="mr-2" type="button" rounded text onClick={(e) => confirm1(e, row.id)} style={{ color: 'red' }} aria-controls="popup_menu_left" aria-haspopup /> }

                    </>
                  )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
