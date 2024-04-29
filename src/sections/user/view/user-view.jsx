
import Card from '@mui/material/Card';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import { renderDelete, renderMoney, renderName, renderRating, renderTaskEdit, renderTrueFalse } from './common';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserPage() {
  const rows = [
    { id: 1, no: 1,edit: '00103939' ,memberId: '00103939', username: 'KoKo', phone: '0944030305', referrer: 'admin', balance: '2004Rs', freeze: false, revenue: '15Rs', membership: 3, merchant: 'AWS', country: null, language: null, register: '10/18/2024 15:30:00 pm', state: true },
    { id: 2, no: 2, memberId: '00103934', username: 'MgMg', phone: '0944030305', referrer: 'admin', balance: '2004', freeze: false, revenue: '15', membership: 3, merchant: 'AWS', country: null, language: null, register: '10/18/2024 15:30:00 pm', state: true },
    { id: 3, no: 3, memberId: '00103934', username: 'Mya Mya', phone: '0944030305', referrer: 'admin', balance: '2004', freeze: false, revenue: '15', membership: 3, merchant: 'AWS', country: null, language: null, register: '10/18/2024 15:30:00 pm', state: true },
    { id: 4, no: 4, memberId: '00103934', username: 'Mya Mya', phone: '0944030305', referrer: 'admin', balance: '2004', freeze: false, revenue: '15', membership: 3, merchant: 'AWS', country: null, language: null, register: '10/18/2024 15:30:00 pm', state: true },
    { id: 5, no: 5, memberId: '00103934', username: 'Mya Mya', phone: '0944030305', referrer: 'admin', balance: '2004', freeze: true, revenue: '15', membership: 3, merchant: 'AWS', country: null, language: null, register: '10/18/2024 15:30:00 pm', state: true },
    { id: 6, no: 6, memberId: '00103934', username: 'Mya Mya', phone: '0944030305', referrer: 'admin', balance: '2004', freeze: false, revenue: '15', membership: 3, merchant: 'AWS', country: null, language: null, register: '10/18/2024 15:30:00 pm', state: true },
    { id: 7, no: 7, memberId: '00103934', username: 'Mya Mya', phone: '0944030305', referrer: 'admin', balance: '2004', freeze: true, revenue: '15', membership: 3, merchant: 'AWS', country: null, language: null, register: '10/18/2024 15:30:00 pm', state: true },
    { id: 8, no: 8, memberId: '00103934', username: 'Kom', phone: '0944030305', referrer: 'admin', balance: '2004', freeze: false, revenue: '15', membership: 3, merchant: 'AWS', country: null, language: null, register: '10/18/2024 15:30:00 pm', state: true },
    { id: 9, no: 9, memberId: '00103934', username: 'Tom', phone: '0944030305', referrer: 'admin', balance: '2004', freeze: false, revenue: '15', membership: 3, merchant: 'AWS', country: null, language: null, register: '10/18/2024 15:30:00 pm', state: true },
    { id: 10, no: 10, memberId: '00103934', username: 'Davis', phone: '0944030305', referrer: 'admin', balance: '2004', freeze: false, revenue: '15', membership: 3, merchant: 'AWS', country: null, language: null, register: '10/18/2024 15:30:00 pm', state: true },
    { id: 11, no: 11, memberId: '00103934', username: 'Kya Kya', phone: '0944030305', referrer: 'admin', balance: '2004', freeze: false, revenue: '15', membership: 3, merchant: 'AWS', country: null, language: null, register: '10/18/2024 15:30:00 pm', state: true },
  ];


  function renderTask(params){
    return <h3>EDIT</h3>
  }

  const columns = [
    { field: 'no', headerName: 'No.', width: 50, headerClassName: 'header', },
    {
      field: 'edit', headerName: 'Edit', width:50,
      renderCell: params => renderTaskEdit(params),
    },
    {
      field: 'delete', headerName: 'Delete', flex: 0.3,
      renderCell: params => renderDelete(params, null, null),
    },
    { field: 'memberId', headerName: 'Member ID', headerClassName: 'header' },
    { field: 'username', headerName: 'Username', renderCell:params=>renderName(params) },
    { field: 'phone', headerName: 'Phone Number', headerClassName: 'header' },
    { field: 'referrer', headerName: 'Referrer', width: 150, headerClassName: 'header' },
    { field: 'balance', headerName: 'Account Balance', width: 150,renderCell:params=>renderMoney(params) },
    { field: 'freeze', headerName: 'Freeze', width: 150, renderCell:params=>renderTrueFalse(params)},
    { field: 'revenue', headerName: 'Revenue',renderCell:params=>renderMoney(params) },
    { field: 'membership', headerName: 'Membership', renderCell:params=>renderRating(params) },
    { field: 'merchant', headerName: 'Contracted Merchant', headerClassName: 'header' },
    { field: 'country', headerName: 'Country', headerClassName: 'header' },
    { field: 'language', headerName: 'Language', headerClassName: 'header' },
    { field: 'register', headerName: 'Registered Time', headerClassName: 'header' },
    { field: 'state', headerName: 'State', headerClassName: 'header' },
  ];

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
        <DataGrid slots={{ toolbar: GridToolbar }} sx={{ height: '70vh' }} rows={rows} columns={columns} />
      </Card>
    </Box>
  );
}
