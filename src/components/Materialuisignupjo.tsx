import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  mt: "100px",
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow: 'none',
  backgroundColor: '#161C27',
  border: 'none',
  borderRadius: '20px',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)', 
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "60vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
  backgroundColor: "#1c2331",
  position: "relative",
}));

export default function SignUp() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [securityQuestionError, setSecurityQuestionError] = React.useState(false);
  const [securityQuestionErrorMessage, setSecurityQuestionErrorMessage] = React.useState('');
  const [alert, setAlert] = React.useState<{ message: string; success: boolean }>({ message: '', success: false });

  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');

  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestionAnswer: ''
  });

  const handleAlertClose = () => {
    setAlert({ message: '', success: false });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      const userData = {
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password'),
        securityQuestionAnswer: data.get('securityQuestionAnswer'),
      };

      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Sikeres regisztráció:', result);
          setAlert({ message: 'Sikeresen regisztráltál!', success: true });
          setTimeout(handleAlertClose, 3000);

          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            securityQuestionAnswer: ''
          });
        } else {
          const errorData = await response.json();
          console.error('Regisztrációs hiba:', errorData);
          setAlert({ message: 'Hiba történt a regisztráció során!', success: false });
          setTimeout(handleAlertClose, 3000);
        }
      } catch (error) {
        console.error('Hálózati hiba:', error);
        setAlert({ message: 'Hálózati hiba történt!', success: false });
        setTimeout(handleAlertClose, 3000);
      }
    }
  };

  const validateInputs = () => {
    const username = document.getElementById('username') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const securityQuestionAnswer = document.getElementById('securityQuestionAnswer') as HTMLInputElement;

    let isValid = true;

    if (!username.value || username.value.length < 4 || username.value.length > 16 || /[^a-zA-Z0-9]/.test(username.value)) {
      setUsernameError(true);
      setUsernameErrorMessage('A felhasználónévnek 4-16 karakter hosszúnak kell lennie és nem tartalmazhat speciális karaktereket vagy szóközt.');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Kérjük, adjon meg egy érvényes e-mail címet.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const containsUpperCase = /[A-Z]/.test(password.value);
    const containsNumber = /\d/.test(password.value);

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('A jelszónak legalább 6 karakter hosszúnak kell lennie.');
      isValid = false;
    } else if (!containsUpperCase && !containsNumber) {
      setPasswordError(true);
      setPasswordErrorMessage('A jelszónak legalább egy nagybetűt és egy számot kell tartalmaznia.');
      isValid = false;
    } else if (!containsUpperCase) {
      setPasswordError(true);
      setPasswordErrorMessage('A jelszónak tartalmaznia kell legalább egy nagybetűt.');
      isValid = false;
    } else if (!containsNumber) {
      setPasswordError(true);
      setPasswordErrorMessage('A jelszónak tartalmaznia kell legalább egy számot.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!securityQuestionAnswer.value) {
      setSecurityQuestionError(true);
      setSecurityQuestionErrorMessage('Kérjük, válaszoljon a biztonsági kérdésre.');
      isValid = false;
    } else {
      setSecurityQuestionError(false);
      setSecurityQuestionErrorMessage('');
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('A jelszavak nem egyeznek meg.');
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage('');
    }

    return isValid;
  };


  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between" sx={{ mt: "100px", }}>
        <Card variant="outlined">
          <LockOutlinedIcon sx={{ fontSize: 60, color: 'white', alignSelf: 'center' }} />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center', color: 'white' }}
          >
            Regisztráció
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username" sx={{ color: 'white' }}>Felhasználónév</FormLabel>
              <TextField
                error={usernameError}
                helperText={usernameErrorMessage}
                id="username"
                name="username"
                placeholder="Felhasználónév"
                autoComplete="username"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={usernameError ? 'error' : 'primary'}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                  '& .MuiFormHelperText-root': {
                    color: usernameError ? 'error.main' : 'white',
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email" sx={{ color: 'white' }}>Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="sajatemailed@email.com"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  '& .MuiFormHelperText-root': {
                    color: emailError ? 'error.main' : 'white',
                  },
                }}
              />
            </FormControl>
            <FormControl>
            <FormLabel htmlFor="password" sx={{ color: 'white' }}>Jelszó</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              required
              fullWidth
              variant="outlined"
              color={passwordError ? 'error' : 'primary'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiFormHelperText-root': { color: passwordError ? 'error.main' : 'white' },
              }}
            />
          </FormControl>

          <FormControl sx={{ mt: 2 }}>
            <FormLabel htmlFor="confirmPassword" sx={{ color: 'white' }}>Jelszó megerősítése</FormLabel>
            <TextField
              error={confirmPasswordError}
              helperText={confirmPasswordErrorMessage}
              name="confirmPassword"
              placeholder="••••••"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              required
              fullWidth
              variant="outlined"
              color={confirmPasswordError ? 'error' : 'primary'}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiFormHelperText-root': { color: confirmPasswordError ? 'error.main' : 'white' },
              }}
            />
          </FormControl>

            <FormControl>
              <FormLabel htmlFor="securityQuestionAnswer" sx={{ color: 'white' }}>Mi jelenleg vagy volt a beceneved?</FormLabel>
              <TextField
                error={securityQuestionError}
                helperText={securityQuestionErrorMessage}
                name="securityQuestionAnswer"
                placeholder="Becenév válasz"
                id="securityQuestionAnswer"
                required
                fullWidth
                variant="outlined"
                color={securityQuestionError ? 'error' : 'primary'}
                value={formData.securityQuestionAnswer}
                onChange={(e) => setFormData({ ...formData, securityQuestionAnswer: e.target.value })}
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
                  '& .MuiFormHelperText-root': {
                    color: securityQuestionError ? 'error.main' : 'white',
                  },
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
              Regisztrálás
            </Button>




            {alert.message && (
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


            <Typography align="center" sx={{ color: 'white' }}>
              Már van felhasználód ?{' '}
              <Link
                href="/login"
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
      </SignUpContainer>
    </>
  );
}
