import React from 'react'
import { Topbar } from './components/TopBar/TopBar'
import { TopPage } from './components/TopPage/TopPage'
import './App.css';



import Routes from "./components/Routes/routes"
export default function App() {
  return (
    <div className="App">

      <TopPage></TopPage>
      <Topbar></Topbar>
      <Routes />

    </div>
  )
}

