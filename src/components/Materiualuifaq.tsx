"use client";

import * as React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: "Hogyan tudok regisztrálni ?",
    answers: [
      <span>Lépjen a Regisztrációs oldalra: <a href="http://localhost:3000/registration" style={{ color: 'lightblue' }}>Kattintson ide!</a></span>,
      "Vigye fel az adatait (Felhasználónév, Email, Jelszó és Jelszó megerősítése, Biztonsági kérdésre a válasz).",
      "Kattintson a 'Regisztráció' gombra.",
      "Ha a felületen látszódik, hogy sikeres regisztráció, akkor már be tud jelentkezni.",
    ],
  },
  {
    question: "Hogyan tud bejelentkezni a fiókjába ?",
    answers: [
      <span>Lépjen a Bejelentkezési oldalra: <a href="http://localhost:3000/login" style={{ color: 'lightblue' }}>Kattintson ide!</a></span>,
      "A regisztrációs adataival jelentkezzen be  (Email, Jelszó).",
      "Kattintson a 'Bejelentkezés' gombra.",
      "Ha a felületen látszódik hogy sikeres bejelentkezés akkor sikeres volt a belépés.",
    ],
  },
  {
    question: "Elfelejtettem a jelszavam. Mit tegyek ?",
    answers: [
      "Lépjen a bejelentkezési oldalon az 'Elfelejtett jelszó' opcióra.",
      <span>Vagy lépjen erre az oldalra: <a href="http://localhost:3000/forgotpassword" style={{ color: 'lightblue' }}>Kattintson ide!</a></span>,
      "Adja meg a felhasználói adatait (Email, Felhazsnálónév, Biztonsági kérdésre a helyes választ).",
      "Majd ha ezeket megadta, írja be az új jelszavát és az új jelszó megerőítésése mezőbe az új jelszavát.",
      "Kattintson a 'Új jelszó beállítása' gombra.",
      "Ha a felületen látszódik hogy sikeres volt az új jelszó beállítása akkor sikeres volt a jelszóváltoztatás.",
      "Bejelentkezhet az új jelszóval.",
    ],
  },
  {
    question: "Biztonságban vannak az adataim ?",
    answers: [
      "Igen, adatai titkosított formában kerülnek tárolásra.",
      "Csak a legmodernebb biztonsági protokollokat használjuk.",
      "Soha nem adjuk ki harmadik fél számára a személyes adatait.",
    ],
  },
  {
    question: "A regisztráció ingyenes ?",
    answers: [
      "Igen a Regisztráció teljes mértékben díjmentes.",
      <span>Ha Regisztrálni szeretne: <a href="http://localhost:3000/registration" style={{ color: 'lightblue' }}>Kattintson ide!</a></span>,
    ],
  },
];


const Materialuifaq: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#1c2331', minHeight: '30vh', py: 5 }} id="faq">
      <Container maxWidth="md" 
      sx={{ 
        mt: 4, 
        mb: 4, 
        bgcolor: '#1c2331', 
        color: 'white', 
        borderRadius: '8px', 
        p: 3 
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
          GYIK
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              bgcolor: '#161C27',
              borderRadius: 1,
              color: 'white',
              border: '1px solid white',
              mb: '30px', 
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 0 8px 2px rgba(30, 144, 255, 0.8)',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {faq.answers.map((answer, idx) => (
                  <li key={idx}>
                    <Typography>{answer}</Typography>
                  </li>
                ))}
              </ul>
            </AccordionDetails>

          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default Materialuifaq;
