import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import UserEdit from "./UserEdit";
import UserContractInfo from "./UserContractInfo";
import { useLocation, useParams } from "react-router-dom";
import { API_HOST } from "src/constant";
import axios from "axios";

export default function UserEditInfoMain(props) {
  const [value, setValue] = useState('1');
  const [user, setUser] = useState([]);
  const [contracts,setContracts] = useState([]);
  const location = useLocation();
  // const user = location.state;
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    let url = `${API_HOST}/admin/trade-user/detail`
    const token = localStorage.getItem('adminAccessToken');
    axios.get(url, {
      mode: 'no-cors',
      params: {uid:id},
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      // console.log(response.data);
      setUser(response.data);
    }).catch(err => {
      console.log(err);
    })

    url = `${API_HOST}/admin/contracts/all`
    axios.get(url, {
      mode: 'no-cors',
      params: {uid:id},
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      setContracts(response.data.contracts);
    }).catch(err => {
      console.log(err);
    })



  }, [id]);

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
        <TabPanel value="1"><UserEdit user={user} /></TabPanel>
        <TabPanel value="2"><UserContractInfo contracts={contracts} /></TabPanel>
        <TabPanel value="3">Topup History Page</TabPanel>
        <TabPanel value="4">Withdrawl History Page</TabPanel>
        <TabPanel value="5">Ledger log</TabPanel>
        <TabPanel value="6">Oder Information</TabPanel>
      </TabContext>
    </Box>
  );
}