// import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

import { Box, Chip, Avatar, Rating, IconButton, Typography } from "@mui/material";

export function renderTaskEdit(params) {
    console.log(params.value);
    return (
        <IconButton sx={{ color: 'primary.dark' }}>
            <Link
                // to={`/user/edit/${params.value}`}
                to={{
                    pathname: `/user/edit/${params.value.uid}`,
                    state: params.value,
                }}
                style={{
                    textDecoration: 'none',
                    textTransform: 'none',
                    color: 'inherit',
                }}>
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
        <Rating readOnly value={params.value} size='small' />
    )
}

export function renderMoney(params) {
    return (
        <Typography variant='subtitle2' color='gray'>
            {params.value} <i>Rs</i>
        </Typography>
    )
}

export function renderNumber(params) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <Avatar sx={{ width: 24, height: 24 }}>
                {params.value}
            </Avatar>
        </Box>);
}

export function renderTrueFalse(params) {
    return params.value ?
        (
            <Box sx={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green' }}/>
            </Box>
        ) :
        (
            <Box sx={{ width: "100%", height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'red' }}/>
            </Box>
        );
}