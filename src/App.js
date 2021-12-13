import React from 'react';
import { useReactiveVar } from '@apollo/client';
import { Route, Routes } from "react-router-dom"
import { ThemeProvider } from 'styled-components';
import { darkModeVar } from './apollo';
import { darkTheme, GlobalStyle, ligthTheme } from './styles';
import Home from './Pages/Home'
import Menu from './Pages/Menu'
import routes from './routes';
import EditAccount from './Pages/EditAccount';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import NaverLoginCallBack from './Pages/NaverLoginCallBack';

function App() {
  const darkMode = useReactiveVar(darkModeVar)
  return (
    <ThemeProvider theme={darkMode ? darkTheme : ligthTheme}>
      <GlobalStyle />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.createAccount} element={<CreateAccount />} />
        <Route path={routes.naverLoginCallBack} element={<NaverLoginCallBack />} />
        <Route path={routes.editAccount} element={<EditAccount />} />
        <Route path={routes.menu} element={<Menu />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
