import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../../api";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterInputs = {
  email: string,
  username: string,
  password: string
}

export default function SignUpPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>()
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    console.log(data);
    await registerAPI(data)
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: "30px", color: "#1c81e6" }} variant="h4">Sign up</Typography>
        <TextField {...register("username", { required: true })} name="username" label="Username" fullWidth size="medium"></TextField>
        {errors.username && <span style={{ color: 'red' }}>This field is required</span>}
        <Box sx={{ height: 15 }}></Box>
        <TextField {...register("email", { required: true })} name="email" label="Email" fullWidth size="medium"></TextField>
        {errors.email && <span style={{ color: 'red' }}>This field is required</span>}
        <Box sx={{ height: 15 }}></Box>
        <TextField {...register("password", { required: true })} name="password" label="Password" fullWidth size="medium"></TextField>
        {errors.password && <span style={{ color: 'red' }}>This field is required</span>}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginY: 2
        }}>
          <Typography>Already have an account?</Typography>
          <Typography onClick={() => navigate('/login')} sx={{ fontWeight: 'bold', color: "#1c81e6", cursor: 'pointer' }}>Login</Typography>
        </Box>
        <Button type="submit" sx={{ textTransform: 'none', padding: 1 }} variant="contained" fullWidth>Sign up</Button>
      </form>
    </Box>
  )
}