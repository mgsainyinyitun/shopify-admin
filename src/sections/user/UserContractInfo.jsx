import { Avatar, Box, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Switch, Typography } from "@mui/material";

export default function UserContractInfo() {
    return (
        <Box sx={{flexGrow: 0.5 }} p={3}>
            <Typography mb={3} variant="h4">
                Contract Information:
            </Typography>
            <Box>
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                    subheader={<ListSubheader>Contract Request</ListSubheader>}
                >
                    <ListItem>
                        <ListItemIcon>
                            <Avatar />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="Shopify Merchant contract Approve Request" />
                        <Switch
                            edge="end"
                        // onChange={handleToggle('wifi')}
                        // checked={checked.indexOf('wifi') !== -1}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Avatar />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="ABC Merchant contract Approve Request" />
                        <Switch
                            edge="end"
                        // onChange={handleToggle('wifi')}
                        // checked={checked.indexOf('wifi') !== -1}
                        />
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}