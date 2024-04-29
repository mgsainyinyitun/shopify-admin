// import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Icon, InlineIcon } from '@iconify/react';
import { Avatar, Box, Button, Chip, IconButton, Rating, Typography } from "@mui/material";
import { green, red } from '@mui/material/colors';
import { Link } from "react-router-dom";

export function renderTaskEdit(params) {
    return (
        <IconButton sx={{ color: 'primary.dark' }}>
            {/* <Link to={`edit/${params.value}`} */}
            <Link to={`/user/edit/${params.value}`}
                style={{
                    textDecoration: 'none',
                    textTransform: 'none',
                    color: 'inherit',
                }}>
                {/* <EditOutlined /> */}
                <Icon icon="mage:edit-pen" />
            </Link>
        </IconButton>);
}

export function renderDelete(params, setOpen, setDeleteTask) {
    return (
        <IconButton sx={{ color: 'red' }} onClick={null}>
            <Icon icon="material-symbols:delete" />
        </IconButton>);
}

export function renderName(params) {
    if (params.value == null) {
        return '';
    }
    return (
        <Chip
            avatar={<Avatar>{params.value[0]}</Avatar>}
            label={params.value}
        />)
}

export function renderRating(params) {
    return (
        <Rating value={params.value} size='small' />
    )
}

export function renderMoney(params) {
    return (
        <Typography variant='subtitle2' color='gray'>
            {params.value} <i>Rs</i>
        </Typography>
    )
}

export function renderTrueFalse(params) {
    return params.value ?
        (
            <Box sx={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green' }}>
                </Box>
            </Box>
        ) :
        (
            <Box sx={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'red' }}>
                </Box>
            </Box>
        );
}