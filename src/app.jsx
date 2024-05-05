/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_HOST } from './constant';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const [login, setLogin] = useState(false);
  const [username,setUsername] = useState('');

  function checkLogin() {
    let url = `${API_HOST}/auth/check`
    let token = localStorage.getItem('adminAccessToken');
    axios.post(url, {
      mode: 'no-cors',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then(response => {
      console.log('check result',response.data);
      localStorage.setItem('login',true);
    }).catch(err => {
      localStorage.setItem('login',false);
      console.log(err);
    })
  }

  useEffect(() => {
    console.log("app checking ")
    checkLogin();
  },[]);

  return (
    <ThemeProvider>
      <Router/>
    </ThemeProvider>
  );
}
