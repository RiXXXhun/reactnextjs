import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "@mui/material";


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

export default function SignIn() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [loginError, setLoginError] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState<{ message: string; success: boolean }>({ message: "", success: false });


  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateInputs()) {
      console.log("Bejelentkezési próbálkozás:", { email, password });

      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Sikeres bejelentkezés!", result);
          setAlertMessage({ message: "Sikeres bejelentkezés!", success: true });

          setEmail("");
          setPassword("");
        } else {
          console.log("Sikertelen bejelentkezés:", result.message);
          setAlertMessage({ message: result.message || "Hibás email vagy jelszó!", success: false });
        }
      } catch (error) {
        console.error("Hálózati hiba:", error);
        setAlertMessage({ message: "Hálózati hiba történt, próbáld újra később!", success: false });
      }
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Kérjük, adjon meg egy érvényes e-mail címet.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Adjon meg egy érvényes jelszót.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
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
            Bejelentkezés
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="sajatemailed@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
              }}
            />

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
              Bejelentkezés
            </Button>

            {alertMessage.message && (
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                {alertMessage.success ? (
                  <CheckCircleIcon sx={{ color: "green", marginRight: 1 }} />
                ) : (
                  <CancelIcon sx={{ color: "red", marginRight: 1 }} />
                )}
                <Typography sx={{ color: alertMessage.success ? "green" : "red" }}>
                  {alertMessage.message}
                </Typography>
              </Box>
            )}

            <Typography align="center" sx={{ color: 'white' }}>
              Még nincs felhasználód ?{' '}
              <Link
                href="/registration"
                sx={{
                  color: 'rgba(50, 150, 255, 0.8)',
                  '&:hover': { color: 'rgba(50, 150, 255, 1)' },
                }}
              >
                Regisztráció
              </Link>
            </Typography>

            <Typography align="center" sx={{ color: 'white' }}>
              Elfejletteted a jelszavad ?{' '}
              <Link
                href="/forgotpassword"
                sx={{
                  color: 'rgba(50, 150, 255, 0.8)',
                  '&:hover': { color: 'rgba(50, 150, 255, 1)' },
                }}
              >
                Katt ide!
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
