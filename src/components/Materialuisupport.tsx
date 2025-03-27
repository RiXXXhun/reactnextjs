import React, { useState, ChangeEvent, FormEvent } from "react";
import { Container, Grid, TextField, Button, Box, Typography, FormControl, FormLabel, FormHelperText, Snackbar, Alert, IconButton } from "@mui/material";
import { Phone, Mail, LocationOn, Close as CloseIcon, Close } from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [alert, setAlert] = useState<{ message: string; success: boolean } | null>(null);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    };

    if (!formData.fullName) {
      newErrors.fullName = "A teljes név kötelező.";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Az e-mail cím kötelező.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Érvénytelen e-mail cím.";
      valid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "A telefonszám kötelező.";
      valid = false;
    }

    if (!formData.message) {
      newErrors.message = "Az üzenet kötelező.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3000/api/auth/support", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setAlert({ message: "Sikeres beküldés!", success: true });
          setFormData({ fullName: "", email: "", phone: "", message: "" });
        } else {
          setAlert({ message: "Hiba történt a beküldés során.", success: false });
        }
      } catch (error) {
        console.error("Request failed", error);
        setAlert({ message: "Hiba történt a beküldés során.", success: false });
      }
    }
  };


  return (
    <Box sx={{ backgroundColor: "#1c2331", py: 3, mt: 20, mb: 20 }}>
      <Container>
        
        <Grid container spacing={4}>

          <Grid item xs={12} md={6}>
            
            <Typography variant="h4" gutterBottom color="white">
              Lépjen velünk kapcsolatba <SupportAgentIcon sx={{ width: "45px", height: "45px" }}></SupportAgentIcon>
            </Typography>
            <Typography variant="body1" color="white" paragraph>
            Ha bármilyen hibát észlel az oldal működésében, kérjük, jelezze nekünk! Fontos számunkra, hogy a Plázaász mindig zavartalanul működjön. 
            Vegye fel velünk a kapcsolatot az alábbi űrlapon keresztül, és csapatunk a lehető leghamarabb utánajár a problémának. Köszönjük a segítségét!
            </Typography>

            <Box mb={4}>
              <Typography variant="h6" color="white">Cím</Typography>
              <Box display="flex" alignItems="center">
                <LocationOn sx={{ color: "white", mr: 2 }} />
                <Typography variant="body2" color="white">Csepreg, Rákóczi Ferenc utca 13, 9735</Typography>
              </Box>
            </Box>

            <Box mb={4}>
              <Typography variant="h6" color="white">Telefon</Typography>
              <Box display="flex" alignItems="center">
                <Phone sx={{ color: "white", mr: 2 }} />
                <Typography variant="body2" color="white">
                   06 30 782 8553
                </Typography>
              </Box>
            </Box>

            <Box mb={4}>
              <Typography variant="h6" color="white">E-mail</Typography>
              <Box display="flex" alignItems="center">
                <Mail sx={{ color: "white", mr: 2 }} />
                <Typography variant="body2" color="white">
                  plazaasz@gmail.com
                </Typography>
              </Box>
            </Box>

            <Box mb={4}>
              <Typography variant="h4" color="white" sx={{ mb: 3 }}>Nyitvatartás <CalendarMonthIcon sx={{ height: "30px", width: "30px" }}></CalendarMonthIcon> </Typography> 



              <Typography variant="body2" color="white" sx={{ mb: 1 }}>Hétfő - 08:00-16:00</Typography>
              <Typography variant="body2" color="white" sx={{ mb: 1 }}>Kedd - 08:00-16:00</Typography>
              <Typography variant="body2" color="white" sx={{ mb: 1 }}>Szerda - 08:00-16:00</Typography>
              <Typography variant="body2" color="white" sx={{ mb: 1 }}>Csütörtök - 08:00-16:00</Typography>
              <Typography variant="body2" color="white" sx={{ mb: 1 }}>Péntek - 08:00-16:00</Typography>
              <Typography variant="body2" color="white" sx={{ mb: 1 }}>Szombat - 10:00-16:00</Typography>
              <Typography variant="body2" color="white">Vasárnap - Zárva</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                backgroundColor: "#161C27", 
                borderRadius: 2,
                boxShadow: 2,
                p: 4,
                display: "flex",
                flexDirection: "column",
                color: "white", 
                transition: 'box-shadow 0.3s ease-in-out', 
                '&:hover': {
                  boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)', 
                },
              }}
            >

              <FormControl required fullWidth sx={{ mb: 3 }}>
              <AlternateEmailIcon sx={{ fontSize: 60, color: 'white', alignSelf: 'center' }} />
                <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center', color: 'white', pb: '40px', pt: '10px' }}
                          >
                            Hibabejelentés
                </Typography>
                <FormLabel htmlFor="fullName" sx={{ color: 'white' }}>
                  Teljes név
                </FormLabel>
                <TextField
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  id="fullName"
                  name="fullName"
                  placeholder="Teljes név"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  variant="outlined"
                  color={errors.fullName ? "error" : "primary"}
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
                      color: errors.fullName ? 'error.main' : 'white',
                    },
                  }}
                />
              </FormControl>

              <FormControl required fullWidth sx={{ mb: 3 }}>
                <FormLabel htmlFor="email" sx={{ color: 'white' }}>
                  E-mail
                </FormLabel>
                <TextField
                  error={!!errors.email}
                  helperText={errors.email}
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
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
              </FormControl>

              <FormControl required fullWidth sx={{ mb: 3 }}>
                <FormLabel htmlFor="phone" sx={{ color: 'white' }}>
                  Telefonszám
                </FormLabel>
                <TextField
                  error={!!errors.phone}
                  helperText={errors.phone}
                  id="phone"
                  name="phone"
                  placeholder="Telefonszám"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
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
              </FormControl>

              <FormControl required fullWidth sx={{ mb: 3 }}>
                <FormLabel htmlFor="message" sx={{ color: 'white' }}>
                  Üzenet
                </FormLabel>
                <TextField
                  error={!!errors.message}
                  helperText={errors.message}
                  id="message"
                  name="message"
                  placeholder="Üzenet"
                  value={formData.message}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  inputProps={{ maxLength: 1000 }}
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
                  }}/>

                <Typography
                  sx={{
                    textAlign: 'right',
                    color: formData.message.length === 1000 ? 'red' : 'white',
                    mt: 1,
                  }}
                >
                  {formData.message.length}/1000
                </Typography>
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
                Beküldés!
              </Button>


              {alert && (
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactForm;
