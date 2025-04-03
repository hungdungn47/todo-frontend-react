import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Authentication/LoginPage'
import { ReactElement } from 'react'
import HomePage from './pages/Home/HomePage'
import SignUpPage from './pages/Authentication/SignUpPage'
import { ToastContainer } from 'react-toastify'

function App(): ReactElement {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
