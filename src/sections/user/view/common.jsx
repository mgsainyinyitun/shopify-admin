// import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Icon, InlineIcon } from '@iconify/react';
import { Avatar, Button, Chip, IconButton, Rating, Typography } from "@mui/material";
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

export function renderRating(params){
    return (
        <Rating value={params.value} size='small'/>
    )
}

export function renderMoney(params){
    return(
        <Typography variant='subtitle2' color='gray'>
            {params.value} <i>Rs</i>
        </Typography>
    )
}