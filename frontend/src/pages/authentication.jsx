import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';




// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {

    

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();


    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)


    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {

                let result = await handleLogin(username, password)


            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {

            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }


     return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      {/* Full screen center */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Auth Box */}
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 380,
            p: 4,
            borderRadius: 3,
            backgroundColor: "#020617",
            textAlign: "center",
          }}
        >
          <Avatar sx={{ m: "auto", mb: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          {/* Toggle buttons */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
            <Button
              variant={formState === 0 ? "contained" : "outlined"}
              onClick={() => setFormState(0)}
            >
              Sign In
            </Button>
            <Button
              variant={formState === 1 ? "contained" : "outlined"}
              onClick={() => setFormState(1)}
            >
              Sign Up
            </Button>
          </Box>

          {/* Form */}
          {formState === 1 && (
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={inputStyle}
            />
          )}

          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={inputStyle}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={inputStyle}
          />

          {error && (
            <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleAuth}
          >
            {formState === 0 ? "Login" : "Register"}
          </Button>
        </Paper>
      </Box>

      <Snackbar open={open} autoHideDuration={4000} message={message} />
    </ThemeProvider>
  );
}

/* 🔹 Reusable input styling */
const inputStyle = {
  backgroundColor: "#1e293b",
  borderRadius: "8px",
  input: { color: "white" },
  label: { color: "#cbd5f5" },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#475569",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#38bdf8",
  },
};