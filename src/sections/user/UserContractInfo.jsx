import { Avatar, Box, Button, Chip, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Switch, Typography } from "@mui/material";

export default function UserContractInfo() {
    return (
        <Box sx={{flexGrow: 0.5 }} p={3}>
            <Typography mb={3} variant="h4">
                Contract Information:
            </Typography>
            <Box>
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper',borderRadius:'10px' }}
                    subheader={<ListSubheader>Contract Request</ListSubheader>}
                >
                    <ListItem>
                        <ListItemIcon>
                            <Avatar />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" 
                            primary="Shopify Merchant contract Approve Request"
                            secondary={<Chip sx={{marginTop:1}} label="APPROVED" size="small" color="success"/>}
                             />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" 
                            primary="ABC Merchant contract Approve Request"
                            secondary={<Chip  sx={{marginTop:1}} label="PENDING" size="small"/>}
                             />
                        <Button variant="outlined" size="small">APPROVE</Button>
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}