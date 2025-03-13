'use client';

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
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

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
  const [usernameError, setUsernameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [securityQuestionAnswerError, setSecurityQuestionAnswerError] = React.useState(false);
  const [newPasswordError, setNewPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [alert, setAlert] = React.useState<{ message: string; success: boolean } | null>(null);

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [securityQuestionAnswer, setSecurityQuestionAnswer] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (validateInputs()) {
      console.log("Új jelszó igénylése:", { username, email, securityQuestionAnswer, newPassword });
  
      try {
        const response = await fetch("/api/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, securityQuestionAnswer, newPassword }),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          console.log("Jelszó igénylés sikeres!", result);
          setAlert({ message: "Új jelszó igénylése sikeres!", success: true });
          setErrorMessage(null);
  

          setUsername("");
          setEmail("");
          setSecurityQuestionAnswer("");
          setNewPassword("");
          setConfirmPassword("");
  
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000); 
        } else {

          console.log("Hiba a jelszó igénylésekor:", result.message);
          setAlert({ message: result.message || "Hiba történt!", success: false });


          if (result.message.includes("Felhasználó nem található")) {
            setUsernameError(true);
            setEmailError(false);
            setSecurityQuestionAnswerError(false);
          } else if (result.message.includes("Érvényes email cím szükséges")) {
            setEmailError(true);
            setUsernameError(false);
            setSecurityQuestionAnswerError(false);
          } else if (result.message.includes("Hibás válasz a biztonsági kérdésre")) {
            setSecurityQuestionAnswerError(true);
            setUsernameError(false);
            setEmailError(false);
          }
        }
      } catch (error) {
        console.error("Hálózati hiba:", error);
        setAlert({ message: "Hálózati hiba történt, próbáld újra később!", success: false });
      }
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!username) {
      setUsernameError(true);
      isValid = false;
    } else {
      setUsernameError(false);
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (!securityQuestionAnswer) {
      setSecurityQuestionAnswerError(true);
      isValid = false;
    } else {
      setSecurityQuestionAnswerError(false);
    }


    if (!newPassword || newPassword.length < 6 || !/(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
      setNewPasswordError(true);
      isValid = false;
    } else {
      setNewPasswordError(false);
    }


    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(true);
      isValid = false;
    } else {
      setConfirmPasswordError(false);
    }

    return isValid;
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <LockOpenIcon sx={{ fontSize: 60, color: "white", alignSelf: "center" }} />
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
            Új jelszó igénylése
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
            <FormControl>
              <FormLabel htmlFor="username" sx={{ color: "white" }}>Felhasználónév</FormLabel>
              <TextField
                error={usernameError}
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                fullWidth
                variant="outlined"
                placeholder="Írd be a felhasználóneved"
                helperText={usernameError ? "Hibás felhasználónév" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email" sx={{ color: "white" }}>Email</FormLabel>
              <TextField
                error={emailError}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                variant="outlined"
                placeholder="Írd be az email címed"
                helperText={emailError ? "Hibás email cím" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="securityQuestionAnswer" sx={{ color: "white" }}>Mi jelenleg vagy volt a beceneved?</FormLabel>
              <TextField
                error={securityQuestionAnswerError}
                id="securityQuestionAnswer"
                name="securityQuestionAnswer"
                value={securityQuestionAnswer}
                onChange={(e) => setSecurityQuestionAnswer(e.target.value)}
                required
                fullWidth
                variant="outlined"
                placeholder="Írd be a választ a biztonsági kérdésre"
                helperText={securityQuestionAnswerError ? "Válasz megadása kötelező" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="newPassword" sx={{ color: "white" }}>Új jelszó</FormLabel>
              <TextField
                error={newPasswordError}
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                fullWidth
                variant="outlined"
                placeholder="Írd be az új jelszót"
                helperText={newPasswordError ? "A jelszónak minimum 6 karakternek kell lennie és tartalmaznia kell egy számot és egy nagybetűt" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="confirmPassword" sx={{ color: "white" }}>Jelszó megerősítése</FormLabel>
              <TextField
                error={confirmPasswordError}
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
                variant="outlined"
                placeholder="Írd be a jelszót mégegyszer"
                helperText={confirmPasswordError ? "A jelszavak nem egyeznek" : ""}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' },
                  },
                  '& .MuiInputBase-input': { color: 'white' },
                }}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                marginTop: 2,
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#3f72af',
                '&:hover': {
                  backgroundColor: '#2c4e8c',
                },
              }}
            >
              Új jelszó beállitása
            </Button>

            {alert && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: 2 }}>
                {alert.success ? (
                  <CheckCircleIcon sx={{ color: "green" }} />
                ) : (
                  <CancelIcon sx={{ color: "red" }} />
                )}
                <Typography sx={{ color: alert.success ? "green" : "red" }}>
                  {alert.message}
                </Typography>
              </Stack>
            )}
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
