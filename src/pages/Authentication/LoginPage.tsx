import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../../api";
import { useForm, SubmitHandler } from "react-hook-form";

type LoginInputs = {
  email: string,
  password: string,
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>()
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    await loginAPI(data)
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', marginBottom: "30px", color: "#1c81e6" }} variant="h4">Login</Typography>
        <TextField label="Email" fullWidth size="medium" {...register("email", { required: true })}></TextField>
        {errors.email && <span style={{ color: 'red' }}>This field is required</span>}
        <Box sx={{ height: 15 }}></Box>
        <TextField label="Password" fullWidth size="medium" {...register("password", { required: true })}></TextField>
        {errors.password && <span style={{ color: 'red' }}>This field is required</span>}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginY: 2
        }}>
          <Typography>Don't have an account?</Typography>
          <Typography onClick={() => navigate('/sign-up')} sx={{ fontWeight: 'bold', color: "#1c81e6", cursor: 'pointer' }}>Sign up</Typography>
        </Box>
        <Button fullWidth type="submit" sx={{ textTransform: 'none', paddingY: 1 }} variant="contained">Login</Button>
      </form>
    </Box>
  )
}