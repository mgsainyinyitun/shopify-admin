import Card from '@mui/material/Card';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import { renderDelete, renderMoney, renderName, renderNumber, renderRating, renderTaskEdit, renderTrueFalse } from './common';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_HOST } from 'src/constant';

// ----------------------------------------------------------------------

export default function UserPage() {
  const columns = [
    { field: 'no', headerName: 'No.', width: 50, renderCell: params => renderNumber(params) },
    {
      field: 'edit', headerName: 'Edit', width: 50,
      renderCell: params => renderTaskEdit(params),
    },
    {
      field: 'delete', headerName: 'Delete', flex: 0.3,
      renderCell: params => renderDelete(params, null, null),
    },
    { field: 'uid', headerName: 'Member ID', headerClassName: 'header' },
    { field: 'username', headerName: 'Username', renderCell: params => renderName(params) },
    { field: 'phone', headerName: 'Phone Number', headerClassName: 'header' },
    { field: 'referrer', headerName: 'Referrer', width: 150, headerClassName: 'header' },
    { field: 'balance', headerName: 'Account Balance', width: 150, renderCell: params => renderMoney(params) },
    { field: 'freeze', headerName: 'Freeze', width: 150, renderCell: params => renderTrueFalse(params) },
    { field: 'revenue', headerName: 'Revenue', renderCell: params => renderMoney(params) },
    { field: 'membership', headerName: 'Membership', renderCell: params => renderRating(params) },
    { field: 'merchant', headerName: 'Contracted Merchant', headerClassName: 'header' },
    { field: 'country', headerName: 'Country', headerClassName: 'header' },
    { field: 'language', headerName: 'Language', headerClassName: 'header' },
    { field: 'registerAt', headerName: 'Registered Time', headerClassName: 'header' },
  ];

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const url = `${API_HOST}/admin/trade-user/all`
    const token = localStorage.getItem('adminAccessToken');
    axios.get(url, {
      mode: 'no-cors',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      console.log(response.data);
      setUsers(response.data.users);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  function prepareData(users) {
    let pUsers = [];
    let i = 1;
    users.forEach(user => {
      pUsers.push(
        {
          no: i,
          edit: user,
          delete: user,
          ...user,
        })
      i++;
    });
    return pUsers;
  }

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button>
      </Stack>

      <Card sx={{
        flexGrow: 1,
        '& .header': {
          backgroundColor: 'white',
        },
      }}>
        <DataGrid slots={{ toolbar: GridToolbar }} sx={{ height: '70vh' }} rows={prepareData(users)} columns={columns} />
      </Card>
    </Box>
  );
}
