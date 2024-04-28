import { Avatar, Box, Button, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Rating, Stack, Switch, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import UserContractInfo from "./UserContractInfo";
export default function UserEdit({user}) {

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

                            <IconButton>
                                <Icon icon="basil:add-solid" />
                            </IconButton>
                        </Box>
                    </Box>
                </Stack>
                {/* <LoadingButton
                sx={{ marginTop: 3 }}
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={() => console.log('update')}
            >
                Login
            </LoadingButton> */}
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
        </Box>
    );
}