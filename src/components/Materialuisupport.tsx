import React, { useState, ChangeEvent, FormEvent } from "react";
import { Container, Grid, TextField, Button, Box, Typography, FormControl, FormLabel, FormHelperText } from "@mui/material";
import { Phone, Mail, LocationOn, AccessTime } from "@mui/icons-material";

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

  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Box sx={{ backgroundColor: "#1c2331", py: 3, mt: 20, mb: 20 }}>
      <Container>
        <Grid container spacing={4}>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom color="white">
              Lépj velünk kapcsolatba
            </Typography>
            <Typography variant="body1" color="white" paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto natus voluptatem similique consectetur illo. Eius esse nostrum aperiam voluptatem? Quaerat eum, magni neque ducimus deleniti adipisci suscipit nostrum laboriosam explicabo?
            </Typography>


            <Box mb={4}>
              <Typography variant="h6" color="white">
                Cím
              </Typography>
              <Box display="flex" alignItems="center">
                <LocationOn sx={{ color: "white", mr: 2 }} />
                <Typography variant="body2" color="white">
                  Csepreg
                </Typography>
              </Box>
            </Box>
            <Box mb={4}>
              <Typography variant="h6" color="white">
                Telefon
              </Typography>
              <Box display="flex" alignItems="center">
                <Phone sx={{ color: "white", mr: 2 }} />
                <Typography variant="body2" color="white">
                  <a href="" style={{ color: "white" }}>06 30 222 2222</a>
                </Typography>
              </Box>
            </Box>
            <Box mb={4}>
              <Typography variant="h6" color="white">
                E-mail
              </Typography>
              <Box display="flex" alignItems="center">
                <Mail sx={{ color: "white", mr: 2 }} />
                <Typography variant="body2" color="white">
                  <a href="" style={{ color: "white" }}>
                    asd@asd.com
                  </a>
                </Typography>
              </Box>
            </Box>
            <Box mb={4}>
              <Typography variant="h6" color="white">
                Nyitvatartás
              </Typography>
              <Typography variant="body2" color="white">
                H-P: 9:00 - 17:00
              </Typography>
              <Typography variant="body2" color="white">
                Szo-V: Zárva
              </Typography>
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
                <FormLabel htmlFor="username" sx={{ color: 'white' }}>
                  Felhasználónév
                </FormLabel>
                <TextField
                  error={usernameError}
                  helperText={usernameErrorMessage}
                  id="username"
                  name="username"
                  placeholder="Felhasználónév"
                  autoComplete="username"
                  autoFocus
                  value={formData.fullName}
                  onChange={handleChange}
                  variant="outlined"
                  color={usernameError ? "error" : "primary"}
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

              <FormControl required fullWidth sx={{ mb: 3 }}>
                <FormLabel htmlFor="email" sx={{ color: 'white' }}>
                  E-mail
                </FormLabel>
                <TextField
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
                    id="message"
                    name="message"
                    placeholder="Üzenet"
                    value={formData.message}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    inputProps={{
                    maxLength: 1000,
                    }}
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


              <Button
                type="submit"
                variant="contained"
                sx={{
                    mt: 3,
                    backgroundColor: "white", 
                    color: "black", 
                    '&:hover': {
                    backgroundColor: "#f1f1f1", 
                    },
                }}>
                Beküldés
                </Button>

            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactForm;
