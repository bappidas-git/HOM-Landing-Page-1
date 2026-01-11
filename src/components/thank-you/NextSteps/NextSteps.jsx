/**
 * NextSteps Component
 * Displays the next steps after form submission
 */

import { Box, Container, Typography, Grid, Icon, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { thankYouContent } from '@/data/content/thankYou';
import styles from './NextSteps.module.css';

const NextSteps = () => {
  const { confirmation } = thankYouContent;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Box
      component="section"
      className={styles.section}
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: '#f8f9fa',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: 600,
              fontSize: { xs: '1.5rem', md: '2rem' },
              textAlign: 'center',
              mb: { xs: 4, md: 6 },
              color: '#1a1a2e',
            }}
          >
            {confirmation.title}
          </Typography>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={3}>
            {confirmation.steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={step.id}>
                <motion.div variants={itemVariants}>
                  <Paper
                    className={styles.stepCard}
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 3,
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                        borderColor: '#8B9A46',
                        '& .stepNumber': {
                          backgroundColor: '#8B9A46',
                          color: '#ffffff',
                        },
                      },
                    }}
                  >
                    {/* Step Number */}
                    <Box
                      className="stepNumber"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(139, 154, 70, 0.1)',
                        color: '#8B9A46',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {index + 1}
                    </Box>

                    {/* Icon */}
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        backgroundColor: 'rgba(139, 154, 70, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 28,
                          color: '#8B9A46',
                        }}
                      >
                        {step.icon}
                      </Icon>
                    </Box>

                    {/* Title */}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                        fontSize: '1rem',
                        mb: 1,
                        color: '#1a1a2e',
                      }}
                    >
                      {step.title}
                    </Typography>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        color: '#666666',
                        lineHeight: 1.6,
                        mb: 2,
                      }}
                    >
                      {step.description}
                    </Typography>

                    {/* Timeline */}
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        color: '#8B9A46',
                        fontWeight: 500,
                        display: 'inline-block',
                        backgroundColor: 'rgba(139, 154, 70, 0.1)',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {step.timeline}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default NextSteps;
