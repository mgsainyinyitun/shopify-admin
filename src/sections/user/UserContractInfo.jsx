import { Avatar, Box, Button, Chip, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { renderNumber, renderRating } from "./view/common";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { API_HOST } from "src/constant";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { showToast } from "../common/Notification";

function renderNm(params) {
    console.log(params.value.name);
    return params.value.name;
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

export default function UserContractInfo({ contracts }) {

    console.log(contracts);
    function prepareData(contracts) {
        let pContracts = [];
        let i = 1;
        contracts.forEach(contract => {
            console.log(contract.merchant.name)
            pContracts.push(
                {
                    no: i,
                    merchant: contract.merchant.name,
                    rating: contract.merchant.rating,
                    ...contract,
                })
            i++;
        });
        return pContracts;
    }

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