import { Backdrop, Box, Fade, FormControlLabel, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, Rating, Stack, Switch, TextField, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
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


export default function UserEdit({ user }) {

    const [open, setOpen] = useState(false);
    const [cBalance, setCbalace] = useState(0);

    function increaseBalance() {
        setCbalace(cBalance + 1);
    }
    function decreaseBalance() {
        setCbalace(cBalance - 1);
    }
    function balanceChangeSubmit(e) {
        e.preventDefault();
        console.log(cBalance);
    }

    return (
        <Box p={3} sx={{ borderRadius: '8px', flex: 1, background: 'white' }} display='flex' justifyContent='space-around'>
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
                            startAdornment={<InputAdornment position="start"><Icon icon="solar:user-id-line-duotone" /></InputAdornment>}
                        />
                    </Box>
                    <Box>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                            size="small"
                            id="username"
                            startAdornment={<InputAdornment position="start"><Icon icon="ph:user-thin" /></InputAdornment>}
                        />
                    </Box>
                    <Box>
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                        <OutlinedInput
                            size="small"
                            id="phone"
                            startAdornment={<InputAdornment position="start"><Icon icon="ic:outline-phone" /></InputAdornment>}
                        />
                    </Box>
                    <Box>
                        <InputLabel htmlFor="revenue">Revenue</InputLabel>
                        <OutlinedInput
                            size="small"
                            id="revenue"
                            startAdornment={<InputAdornment position="start"><Icon icon="marketeq:wallet-alt" /></InputAdornment>}
                        />
                    </Box>

                    <Box display='flex'>
                        <Box>
                            <InputLabel htmlFor="balance">Balance</InputLabel>
                            <OutlinedInput
                                size="small"
                                id="balance"
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
                    <Box>
                        <Rating value={5} />
                    </Box>
                    <Box>
                        <FormControlLabel
                            value="freeze"
                            control={<Switch color="primary" />}
                            label="Freeze"
                            labelPlacement="top"
                        />
                    </Box>
                </Stack>
            </Box>

            {/* Pop Up*/}
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
                                <IconButton onClick={decreaseBalance}>
                                    <Icon icon="zondicons:minus-solid" />
                                </IconButton>
                                <OutlinedInput
                                    size="small"
                                    id="cbalance"
                                    startAdornment={<InputAdornment position="start"><i>Rs</i></InputAdornment>}
                                    value={cBalance}
                                />
                                <IconButton onClick={increaseBalance}>
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
        </Box >
    );
}