import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import UserEdit from "./UserEdit";
import UserContractInfo from "./UserContractInfo";
import { useParams } from "react-router-dom";

export default function UserEditInfoMain() {
  const [value, setValue] = useState('1');
  const { id } = useParams();
  console.log(id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="User Information" value="1" />
            <Tab label="Contaract Information" value="2" />
            <Tab label="Topup History" value="3" />
            <Tab label="Withdrawl History" value="4" />
            <Tab label="Ledger Change Log" value="5" />
            <Tab label="Order Informtion" value="6" />
          </TabList>
        </Box>
        <TabPanel value="1"><UserEdit user={null}/></TabPanel>
        <TabPanel value="2"><UserContractInfo/></TabPanel>
        <TabPanel value="3">Topup History Page</TabPanel>
        <TabPanel value="4">Withdrawl History Page</TabPanel>
        <TabPanel value="5">Ledger log</TabPanel>
        <TabPanel value="6">Oder Information</TabPanel>
      </TabContext>
    </Box>
  );
}