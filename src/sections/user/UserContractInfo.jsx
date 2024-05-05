import axios from "axios";
import PropTypes from 'prop-types';
import { ToastContainer } from "react-toastify";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Chip, List, Avatar, Button, ListItem, Typography, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";

import { API_HOST } from "src/constant";

import { showToast } from "../common/Notification";
import { renderNumber, renderRating } from "./view/common";

function renderNm(params) {
    console.log(params.value.name);
    return params.value.name;
}
function prepareData(contracts) {
    const pContracts = [];
    let i = 1;
    contracts.map(contract => {
        console.log(contract.merchant.name)
        pContracts.push(
            {
                no: i,
                merchant: contract.merchant.name,
                rating: contract.merchant.rating,
                ...contract,
            })
        i += 1;
        return pContracts;
    });
    return pContracts;
}

const columns = [
    { field: 'no', headerName: 'No.', width: 50, renderCell: params => renderNumber(params) },
    { field: 'merchant', headerName: 'Merchant', renderCell: params => renderNm(params) },
    { field: 'rating', headerName: 'Rating', renderCell: params => renderRating(params) },
    { field: 'status', headerName: 'Status', headerClassName: 'header' },
    { field: 'taskComplete', headerName: 'Task Complete', width: 150, headerClassName: 'header' },
    { field: 'totalTask', headerName: 'Total Tasks', width: 150 },
    { field: 'contractAt', headerName: 'Contract Date', width: 150 },
];

UserContractInfo.propTypes = {
    contracts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default function UserContractInfo({ contracts }) {
    console.log(contracts);
    function contractApproveRequest(contractId) {
        const url = `${API_HOST}/admin/contracts/approve/request`
        const token = localStorage.getItem('adminAccessToken');
        axios.post(url, { contractId }, {
            mode: 'no-cors',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then(response => {
            showToast('Successfully Accepted user request.', 'success')
            console.log(response.data);
        }).catch(err => {
            showToast('There was error accepting user request.', 'error')
            console.log(err);
        })
    }


    function contractRejectRequest(contractId) {
        const url = `${API_HOST}/admin/contracts/reject/request`
        const token = localStorage.getItem('adminAccessToken');
        axios.post(url, { contractId }, {
            mode: 'no-cors',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then(response => {
            showToast('Successfully Rejected user request.', 'success')
            console.log(response.data);
        }).catch(err => {
            showToast('There was error accepting user reject.', 'error')
            console.log(err);
        })
    }

    return (
        <Box sx={{ flexGrow: 0.5 }} p={3}>
            <ToastContainer />
            <Typography mb={3} variant="h6">
                Contract Information:
            </Typography>
            <Box>
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '10px' }}
                    subheader={<ListSubheader>Contract Request</ListSubheader>}
                >

                    {contracts.map(contract => (
                        <ListItem key={contract.id}>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText id="switch-list-label-wifi"
                                primary={`${contract.merchant.name} Merchant contract Approve Request`}
                                secondary={
                                    <Chip sx={{ marginTop: 1 }}
                                        label={contract.status} size="small"
                                        color={contract.status === 'APPROVED' ? 'success' : 'default'} />}
                            />
                            {
                                contract.status === 'PENDING' ? (
                                    <Box>
                                        <Button onClick={() => contractApproveRequest(contract.id)} sx={{ marginRight: 1 }} variant="outlined" size="small">APPROVE</Button>
                                        <Button onClick={() => contractRejectRequest(contract.id)} variant="outlined" size="small" color="error">REJECT</Button>
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
                <DataGrid sx={{ background: 'white' }} slots={{ toolbar: GridToolbar }} rows={prepareData(contracts)} columns={columns} />
            </Box>
        </Box>
    )
}