import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../api";

export default function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  const handleLogin = async () => {
    await loginAPI(formData)
    navigate('/')
  }
  return (
    <Box sx={{
      width: '40%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 'auto',
      height: '100vh'
    }}>
      <Typography sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: "30px", color: "#1c81e6" }} variant="h4">Login</Typography>
      <TextField name="email" label="Email" fullWidth size="medium" onChange={handleFormChange}></TextField>
      <Box sx={{ height: 15 }}></Box>
      <TextField name="password" label="Password" fullWidth size="medium" onChange={handleFormChange}></TextField>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginY: 2
      }}>
        <Typography>Don't have an account?</Typography>
        <Typography onClick={() => navigate('/sign-up')} sx={{ fontWeight: 'bold', color: "#1c81e6", cursor: 'pointer' }}>Sign up</Typography>
      </Box>
      <Button onClick={handleLogin} sx={{ textTransform: 'none', paddingY: 1 }} variant="contained">Login</Button>
    </Box>
  )
}