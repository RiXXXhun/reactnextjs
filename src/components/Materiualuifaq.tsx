"use client";

import * as React from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: "Lorem ipsum dolor sit amet?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempus felis a felis facilisis, a dapibus nunc suscipit.",
  },
  {
    question: "Quisque ut velit ac nisi viverra pretium?",
    answer: "Quisque ut velit ac nisi viverra pretium. Suspendisse potenti. Phasellus dignissim purus vel velit cursus, sed commodo lorem varius.",
  },
  {
    question: "Fusce iaculis quam sed sapien euismod?",
    answer: "Fusce iaculis quam sed sapien euismod, ac cursus mauris dictum. Nam id sapien eu turpis aliquet egestas in id erat.",
  },
  {
    question: "Curabitur fringilla lectus nec tellus fermentum?",
    answer: "Curabitur fringilla lectus nec tellus fermentum, ut venenatis orci aliquet. Donec ac tortor sed urna egestas commodo.",
  },
  {
    question: "Pellentesque non eros vel mauris pulvinar?",
    answer: "Pellentesque non eros vel mauris pulvinar cursus. Aliquam erat volutpat. Vivamus sit amet dolor eget odio malesuada.",
  },
];

const Materialuifaq: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#1c2331', minHeight: '30vh', py: 5 }}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, bgcolor: '#1c2331', color: 'white', borderRadius: '8px', p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, textAlign: 'center' }}>
          FAQ
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
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default Materialuifaq;
