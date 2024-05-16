import axios from "axios";
import PropTypes from 'prop-types';
import { ToastContainer } from "react-toastify";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Chip, List, Avatar, Button, ListItem, Typography, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";

import { API_HOST } from "src/constant";

import { showToast } from "src/sections/common/Notification";

import { renderNumber } from "./common";

UserWithdrawPage.propTypes = {
    withdraws: PropTypes.arrayOf(PropTypes.object).isRequired,
    uid:PropTypes.arrayOf(PropTypes.object).isRequired
};


// {
//     "id": 1,
//     "bankUsername": "Sai Nyi",
//     "username": "admin",
//     "amount": 1353535,
//     "status": "ACCEPT",
//     "account": "ABCACCOUNT",
//     "identification": "0838383",
//     "email": "mgsainyinyitun.tumdy@gmail.com",
//     "phone": "09440096573",
//     "bankInfo": {
//         "id": 1,
//         "name": "USABANK",
//         "image": null,
//         "uid": null
//     }
// }

const columns = [
    { field: 'no', headerName: 'No.', width: 50, renderCell: params => renderNumber(params) },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'bankUsername', headerName: 'Bank User Name'},
    { field: 'bankName', headerName: 'Bank Name' },
    { field: 'identification', headerName: 'CPF Number', headerClassName: 'header' },
    { field: 'email', headerName: 'E-mail', width: 150, headerClassName: 'header' },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
];

function prepareData(withdraws) {
    const pwithdraws = [];
    withdraws.map((withdraw,i) => {
        pwithdraws.push(
            {
                no: i+1,
                bankName:withdraw.bankInfoResponse.name,
                ...withdraw,
            })
        return pwithdraws;
    });
    return pwithdraws;
}


export default function UserWithdrawPage({ withdraws, uid }) {

    function withdrawApproveRequest(withdraw) {
        const url = `${API_HOST}/admin/withdraw/accept/request`
        const token = localStorage.getItem('adminAccessToken');

        const data = {
            withdrawId: withdraw.id,
            uid,
        }

        axios.post(url, data, {
            mode: 'no-cors',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then(response => {
            showToast('Successfully Accepted withdraw request.', 'success')
            console.log(response.data);
        }).catch(err => {
            showToast('There was error accepting withdraw request.', 'error')
            console.log(err);
        })
    }
    function withdrawRejectRequest(withdraw) {
        const url = `${API_HOST}/admin/withdraw/reject/request`
        const token = localStorage.getItem('adminAccessToken');

        const data = {
            withdrawId: withdraw.id,
        }

        axios.post(url, data, {
            mode: 'no-cors',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then(response => {
            showToast('Successfully Reject withdraw request.', 'success')
            console.log(response.data);
        }).catch(err => {
            showToast('There was error rejecting withdraw request.', 'error')
            console.log(err);
        })
    }
    return (
        <Box sx={{ flexGrow: 0.5 }} p={3}>
            <ToastContainer />
            <Typography mb={3} variant="h6">
                Withdraw Information:
            </Typography>
            <Box>
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '10px' }}
                    subheader={<ListSubheader>Withdraw Request</ListSubheader>}
                >
                    {withdraws.map((withdraw, i) => (
                        <ListItem key={withdraw.id}>
                            <ListItemIcon>
                                <Avatar sx={{ width: 26, height: 26 }}>{i + 1}</Avatar>
                            </ListItemIcon>
                            <ListItemText id="switch-list-label-wifi"
                                primary={`${withdraw.username} is requesting to Approve withdraw.`}
                                secondary={
                                    <Chip sx={{ marginTop: 1 }}
                                        label={withdraw.status} size="small"
                                        color={withdraw.status === 'ACCEPT' ? 'success' : 'default'} />}
                            />
                            {
                                withdraw.status === 'PENDING' ? (
                                    <Box>
                                        <Button onClick={()=>withdrawApproveRequest(withdraw)} sx={{ marginRight: 1 }} variant="outlined" size="small">APPROVE</Button>
                                        <Button onClick={()=>withdrawRejectRequest(withdraw)} variant="outlined" size="small" color="error">REJECT</Button>
                                    </Box>
                                ) : null
                            }
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Typography mb={3} variant="h6">
                Contract History:
            </Typography>
            <Box>
                <DataGrid sx={{ background: 'white' }} slots={{ toolbar: GridToolbar }} rows={prepareData(withdraws)} columns={columns} />
            </Box>
        </Box>
    )
}

