'use client';

//NEM EGY VALÓDI HASZNÁLHATÓ KOMPONENS CSAK A VIZUÁLIS ÉLMÉNY ÉRDEKÉBEN VAN ELKÉSZTVE

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import { Password } from "@mui/icons-material";

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "60vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  backgroundColor: "#1c2331",
  position: "relative",
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  minHeight: "500px",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  border: "none",
  borderRadius: "20px",
  backgroundColor: "#161C27",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 0 8px 2px rgba(30, 144, 255, 0.8)",
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));

export default function ForgotPassword() {
  const [message, setMessage] = React.useState<string | null>(null);
  const [alert, setAlert] = React.useState({ message: "", success: false });
  const [alertVisible, setAlertVisible] = React.useState(false);

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = React.useState("");

  const handleModifyClick = () => {
    setUsername("");
    setEmail("");
    setSecurityQuestionAnswer("");

    setAlert({ message: "Jelenleg nincs lehetőség módosítani az adatokat.", success: false });
    setAlertVisible(true);

    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center" sx={{ mt: "100px" }}>
        <Card variant="outlined">
          <DisplaySettingsIcon sx={{ fontSize: 60, color: "white", alignSelf: "center" }} />
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              textAlign: "center",
              color: "white",
            }}
          >
            Adatmódosítás
          </Typography>

          <Box component="form" sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="username" sx={{ color: "white" }}>Felhasználónév</FormLabel>
              <TextField
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder="Írja be az új felhasználónevét"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
              <Button variant="outlined" onClick={handleModifyClick} sx={{ mt: 1, color: "white" }}>Módosítás</Button>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email" sx={{ color: "white" }}>Email</FormLabel>
              <TextField
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder="Írja be az új email címét"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
              <Button variant="outlined" onClick={handleModifyClick} sx={{ mt: 1, color: "white" }}>Módosítás</Button>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="securityQuestionAnswer" sx={{ color: "white" }}>Biztonsági kérdés válasza</FormLabel>
              <TextField
                id="securityQuestionAnswer"
                name="securityQuestionAnswer"
                value={securityQuestionAnswer}
                onChange={(e) => setSecurityQuestionAnswer(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder="Mi a jelenlegi vagy volt beceneve?"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
              <Button variant="outlined" onClick={handleModifyClick} sx={{ mt: 1, color: "white" }}>Módosítás</Button>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password" sx={{ color: "white" }}>Jelszó</FormLabel>
              <TextField
                id="password"
                type="password"
                value={Password} 
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder="Írja be az új jelszavát"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
              <Button variant="outlined" onClick={handleModifyClick} sx={{ mt: 1, color: "white" }}>Módosítás</Button>
            </FormControl>

            {alertVisible && (
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                {alert.success ? (
                  <CheckCircleIcon sx={{ color: 'green', marginRight: 1 }} />
                ) : (
                  <CancelIcon sx={{ color: 'red', marginRight: 1 }} />
                )}
                <Typography sx={{ color: alert.success ? 'green' : 'red' }}>
                  {alert.message}
                </Typography>
              </Box>
            )}
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
