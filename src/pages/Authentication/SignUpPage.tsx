import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../../api";
import { useState } from "react";

export default function SignUpPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }
  const handleRegister = async () => {
    await registerAPI(formData)
    navigate('/login')
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
      <Typography sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: "30px", color: "#1c81e6" }} variant="h4">Sign up</Typography>
      <TextField onChange={handleFormChange} name="username" label="Username" fullWidth size="medium"></TextField>
      <Box sx={{ height: 15 }}></Box>
      <TextField onChange={handleFormChange} name="email" label="Email" fullWidth size="medium"></TextField>
      <Box sx={{ height: 15 }}></Box>
      <TextField onChange={handleFormChange} name="password" label="Password" fullWidth size="medium"></TextField>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginY: 2
      }}>
        <Typography>Already have an account?</Typography>
        <Typography onClick={() => navigate('/login')} sx={{ fontWeight: 'bold', color: "#1c81e6", cursor: 'pointer' }}>Login</Typography>
      </Box>
      <Button onClick={handleRegister} sx={{ textTransform: 'none', padding: 1 }} variant="contained">Sign up</Button>
    </Box>
  )
}