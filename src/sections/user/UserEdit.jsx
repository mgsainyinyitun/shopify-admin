import axios from "axios";
import { useState } from "react";
import PropTypes from 'prop-types';
import { Icon } from "@iconify/react";
import { ToastContainer } from "react-toastify";

import { LoadingButton } from "@mui/lab";
import { Box, Fade, Modal, Stack, Rating, Switch, Select, Backdrop, MenuItem, TextField, IconButton, InputLabel, Typography, OutlinedInput, InputAdornment, FormControlLabel } from "@mui/material";

import { API_HOST } from "src/constant";

import { showToast } from "../common/Notification";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

UserEdit.propTypes = {
    user: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default function UserEdit({ user }) {

    const [open, setOpen] = useState(false);
    const [mrating, setMrating] = useState(false);
    const [member, setMember] = useState(user.membership ? user.membership : 0);
    const [cBalance, setCbalace] = useState(0);

    function increaseBalance() {
        setCbalace(cBalance + 1);
    }
    function decreaseBalance() {
        setCbalace(cBalance - 1);
    }


    function membershipChangeSubmit(e) {
        e.preventDefault();
        console.log(member);
        const url = `${API_HOST}/admin/user/membership/change`
        const token = localStorage.getItem('adminAccessToken');
        const data = {
            membership: member,
            uid: user.uid,
        }
        axios.post(url, data, {
            mode: 'no-cors',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then(response => {
            showToast('Successfully Change user membership.', 'success');
            setMrating(false);
            console.log(response.data);
        }).catch(err => {
            showToast('There was error changing user membership.', 'error')
            console.log(err);
            setMrating(false);
        })
    }

    function balanceChangeSubmit(e) {
        e.preventDefault();
        const url = `${API_HOST}/admin/user/balance/increase`
        const token = localStorage.getItem('adminAccessToken');
        const data = {
            amount: cBalance,
            uid: user.uid,
        }
        axios.post(url, data, {
            mode: 'no-cors',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then(response => {
            showToast('Successfully Increase user balance.', 'success')
            console.log(response.data);
            setOpen(false);
        }).catch(err => {
            showToast('There was error increase balance.', 'error')
            console.log(err);
            setOpen(false);
        })
    }

    return (
        <Box p={3} sx={{ borderRadius: '8px', flex: 1, background: 'white' }} display='flex' justifyContent='space-around'>
            <ToastContainer />
            <Box>
                <Typography mb={3} variant="h4">
                    User Information:
                </Typography>
                <Stack spacing={3}>
                    <Box>
                        <InputLabel htmlFor="id">ID</InputLabel>
                        <OutlinedInput
                            size="small"
                            id="id"
                            value={user ? user.uid : null}
                            startAdornment={<InputAdornment position="start"><Icon icon="solar:user-id-line-duotone" /></InputAdornment>}
                        />
                    </Box>
                    <Box>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                            size="small"
                            id="username"
                            value={user ? user.username : null}
                            startAdornment={<InputAdornment position="start"><Icon icon="ph:user-thin" /></InputAdornment>}
                        />
                    </Box>
                    <Box>
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                        <OutlinedInput
                            size="small"
                            id="phone"
                            value={user ? user.phone : null}
                            startAdornment={<InputAdornment position="start"><Icon icon="ic:outline-phone" /></InputAdornment>}
                        />
                    </Box>
                    <Box>
                        <InputLabel htmlFor="revenue">Revenue</InputLabel>
                        <OutlinedInput
                            size="small"
                            id="revenue"
                            value={user ? user.revenue : null}
                            startAdornment={<InputAdornment position="start"><Icon icon="marketeq:wallet-alt" /></InputAdornment>}
                        />
                    </Box>

                    <Box display='flex'>
                        <Box>
                            <InputLabel htmlFor="balance">Balance</InputLabel>
                            <OutlinedInput
                                size="small"
                                id="balance"
                                value={user ? user.balance : null}
                                startAdornment={<InputAdornment position="start"><Icon icon="material-symbols:wallet" /></InputAdornment>}
                            />

                            <IconButton onClick={() => setOpen(true)}>
                                <Icon icon="basil:add-solid" />
                            </IconButton>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            <Box>
                <Stack spacing={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Rating value={user ? user.membership : null} readOnly />
                        <IconButton onClick={() => setMrating(true)}>
                            <Icon icon="mingcute:edit-4-line" />
                        </IconButton>
                    </Box>
                    <Box>
                        <FormControlLabel
                            value="freeze"
                            control={<Switch color="primary" checked={user ? user.freeze : false} />}
                            label="Freeze"
                            labelPlacement="top"
                        />
                    </Box>
                </Stack>
            </Box>

            {/* Pop Up */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <form onSubmit={balanceChangeSubmit}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                User Balance
                            </Typography>
                            <Box display='flex'>
                                <IconButton onClick={() => decreaseBalance()}>
                                    <Icon icon="zondicons:minus-solid" />
                                </IconButton>
                                <TextField
                                    size="small"
                                    id="cbalance"
                                    startAdornment={<InputAdornment position="start"><i>Rs</i></InputAdornment>}
                                    value={cBalance}
                                    onChange={e => setCbalace(e.target.value)}
                                />
                                <IconButton onClick={() => increaseBalance()}>
                                    <Icon icon="basil:add-solid" />
                                </IconButton>
                            </Box>
                            <LoadingButton
                                sx={{ marginTop: 3 }}
                                size="large"
                                type="submit"
                                variant="contained"
                                color="inherit"
                                onClick={() => console.log('update')}
                            >
                                Change
                            </LoadingButton>
                        </form>
                    </Box>
                </Fade>
            </Modal>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={mrating}
                onClose={() => setMrating(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={mrating}>
                    <Box sx={style}>
                        <form onSubmit={membershipChangeSubmit}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                User Membership
                            </Typography>
                            <Box display='flex' flexDirection="column">
                                <Select
                                    id="member"
                                    value={member}
                                    label="Age"
                                    size="small"
                                    onChange={e => setMember(e.target.value)}
                                >
                                    <MenuItem value={1}>One</MenuItem>
                                    <MenuItem value={2}>Two</MenuItem>
                                    <MenuItem value={3}>Three</MenuItem>
                                    <MenuItem value={4}>Four</MenuItem>
                                    <MenuItem value={5}>Five</MenuItem>
                                </Select>
                            </Box>
                            <LoadingButton
                                sx={{ marginTop: 3 }}
                                size="large"
                                type="submit"
                                variant="contained"
                                color="inherit"
                            >
                                CHANGE
                            </LoadingButton>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </Box >
    );
}