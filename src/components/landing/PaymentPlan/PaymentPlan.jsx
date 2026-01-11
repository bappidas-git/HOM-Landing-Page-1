/**
 * PaymentPlan Section Component
 * Payment milestones and loan information
 */

import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { useUIContext } from '@/context/UIContext';
import { paymentPlanContent, getPaymentProgress } from '@/data/content/paymentPlan';
import styles from './PaymentPlan.module.css';

const PaymentPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const { openPopup } = useUIContext();

  const currentPlan = selectedPlan === 'standard'
    ? paymentPlanContent.standardPlan
    : paymentPlanContent.downPaymentPlan;

  const paymentProgress = getPaymentProgress(selectedPlan);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <SectionWrapper
      id={paymentPlanContent.sectionId}
      background="default"
      paddingY="large"
    >
      <SectionTitle
        title={paymentPlanContent.title}
        subtitle={paymentPlanContent.subtitle}
        align="center"
        showDecoration={true}
        decorationType="line"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Plan Selector */}
        <motion.div variants={itemVariants}>
          <Box className={styles.planSelector}>
            <Button
              variant={selectedPlan === 'standard' ? 'contained' : 'outlined'}
              color="secondary"
              onClick={() => setSelectedPlan('standard')}
              className={styles.planButton}
            >
              {paymentPlanContent.standardPlan.name}
              {paymentPlanContent.standardPlan.recommended && (
                <Chip label="Recommended" size="small" className={styles.recommendedChip} />
              )}
            </Button>
            <Button
              variant={selectedPlan === 'downpayment' ? 'contained' : 'outlined'}
              color="secondary"
              onClick={() => setSelectedPlan('downpayment')}
              className={styles.planButton}
            >
              {paymentPlanContent.downPaymentPlan.name}
            </Button>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Payment Milestones */}
          <Grid item xs={12} md={7}>
            <motion.div variants={itemVariants}>
              <Box className={styles.milestonesCard}>
                <Typography variant="h6" className={styles.cardTitle}>
                  {currentPlan.name}
                </Typography>
                <Typography variant="body2" className={styles.cardDescription}>
                  {currentPlan.description}
                </Typography>

                <Stepper orientation="vertical" className={styles.stepper}>
                  {paymentProgress.map((milestone, index) => (
                    <Step key={milestone.id} active expanded>
                      <StepLabel
                        StepIconComponent={() => (
                          <Box className={styles.stepIcon}>
                            <Icon>{milestone.icon}</Icon>
                          </Box>
                        )}
                      >
                        <Box className={styles.stepHeader}>
                          <Typography variant="subtitle1" className={styles.stepTitle}>
                            {milestone.stage}
                          </Typography>
                          <Typography variant="h5" className={styles.stepPercentage}>
                            {milestone.percentage}%
                          </Typography>
                        </Box>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" className={styles.stepDescription}>
                          {milestone.description}
                        </Typography>
                        <Box className={styles.progressBar}>
                          <Box
                            className={styles.progressFill}
                            style={{ width: `${milestone.cumulative}%` }}
                          />
                        </Box>
                        <Typography variant="caption" className={styles.cumulativeText}>
                          Cumulative: {milestone.cumulative}%
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </motion.div>
          </Grid>

          {/* Loan Info and Benefits */}
          <Grid item xs={12} md={5}>
            <motion.div variants={itemVariants}>
              {/* Loan Assistance */}
              <Box className={styles.loanCard}>
                <Typography variant="h6" className={styles.cardTitle}>
                  <Icon className={styles.titleIcon}>account_balance</Icon>
                  {paymentPlanContent.loanInfo.title}
                </Typography>
                <Typography variant="body2" className={styles.cardDescription}>
                  {paymentPlanContent.loanInfo.description}
                </Typography>

                <Box className={styles.featuresList}>
                  {paymentPlanContent.loanInfo.features.map((feature, index) => (
                    <Box key={index} className={styles.featureItem}>
                      <Icon className={styles.checkIcon}>check_circle</Icon>
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Box className={styles.bankPartners}>
                  <Typography variant="subtitle2" className={styles.bankTitle}>
                    Partner Banks
                  </Typography>
                  <Box className={styles.bankGrid}>
                    {paymentPlanContent.loanInfo.bankPartners.slice(0, 5).map((bank, index) => (
                      <Box key={index} className={styles.bankItem}>
                        <Typography variant="body2">{bank.name}</Typography>
                        <Typography variant="caption" className={styles.bankRate}>
                          {bank.rate}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </motion.div>

            <motion.div variants={itemVariants}>
              {/* Tax Benefits */}
              <Box className={styles.taxBenefits}>
                <Typography variant="h6" className={styles.cardTitle}>
                  <Icon className={styles.titleIcon}>savings</Icon>
                  {paymentPlanContent.taxBenefits.title}
                </Typography>

                <Box className={styles.benefitsList}>
                  {paymentPlanContent.taxBenefits.benefits.map((benefit, index) => (
                    <Box key={index} className={styles.benefitItem}>
                      <Typography variant="subtitle2" className={styles.benefitSection}>
                        {benefit.section}
                      </Typography>
                      <Typography variant="h6" className={styles.benefitAmount}>
                        {benefit.benefit}
                      </Typography>
                      <Typography variant="body2" className={styles.benefitDescription}>
                        {benefit.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Important Notes */}
        <motion.div variants={itemVariants}>
          <Box className={styles.notesSection}>
            <Typography variant="subtitle2" className={styles.notesTitle}>
              <Icon className={styles.notesIcon}>info</Icon>
              Important Notes
            </Typography>
            <Box component="ul" className={styles.notesList}>
              {paymentPlanContent.notes.map((note, index) => (
                <li key={index}>
                  <Typography variant="body2">{note}</Typography>
                </li>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* CTA */}
        <Box className={styles.ctaWrapper}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<Icon>request_quote</Icon>}
            onClick={() => openPopup('enquiry')}
            className={styles.ctaButton}
          >
            {paymentPlanContent.cta.primary.text}
          </Button>
        </Box>
      </motion.div>
    </SectionWrapper>
  );
};

export default PaymentPlan;
