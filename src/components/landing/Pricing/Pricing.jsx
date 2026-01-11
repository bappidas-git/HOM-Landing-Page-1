/**
 * Pricing Section Component
 * Transparent pricing with unit details and CTA
 */

import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Slider,
} from '@mui/material';
import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import SectionWrapper from '@/components/common/SectionWrapper';
import SectionTitle from '@/components/common/SectionTitle';
import { useUIContext } from '@/context/UIContext';
import { pricingContent, calculateEMI } from '@/data/content/pricing';
import styles from './Pricing.module.css';

const Pricing = () => {
  const { openPopup } = useUIContext();
  const [loanAmount, setLoanAmount] = useState(pricingContent.emiCalculator.defaultLoanAmount);
  const [interestRate, setInterestRate] = useState(pricingContent.emiCalculator.defaultInterestRate);
  const [tenure, setTenure] = useState(pricingContent.emiCalculator.defaultTenure);

  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalAmount = emi * tenure * 12;
  const totalInterest = totalAmount - loanAmount;

  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `\u20B9${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `\u20B9${(value / 100000).toFixed(2)} L`;
    }
    return `\u20B9${value.toLocaleString('en-IN')}`;
  };

  const handleGetPrice = (unitType) => {
    openPopup('pricing');
  };

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
      id={pricingContent.sectionId}
      background="paper"
      paddingY="large"
    >
      <SectionTitle
        title={pricingContent.title}
        subtitle={pricingContent.subtitle}
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
        {/* Pricing Table */}
        <motion.div variants={itemVariants}>
          <TableContainer component={Paper} className={styles.tableContainer}>
            <Table>
              <TableHead>
                <TableRow className={styles.tableHeader}>
                  <TableCell>Unit Type</TableCell>
                  <TableCell align="center">Carpet Area</TableCell>
                  <TableCell align="center">Super Built-up Area</TableCell>
                  <TableCell align="center">Starting Price*</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pricingContent.pricingTable.map((unit) => (
                  <TableRow
                    key={unit.id}
                    className={`${styles.tableRow} ${unit.featured ? styles.featured : ''}`}
                  >
                    <TableCell>
                      <Box className={styles.unitInfo}>
                        <Typography variant="subtitle1" className={styles.unitType}>
                          {unit.unitType}
                        </Typography>
                        <Typography variant="caption" className={styles.tower}>
                          {unit.tower}
                        </Typography>
                        {unit.featured && (
                          <Chip label="Popular" size="small" className={styles.popularChip} />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">{unit.carpetArea}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">{unit.sba}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6" className={styles.price}>
                        {unit.startingPrice}
                      </Typography>
                      <Typography variant="caption" className={styles.pricePerSqft}>
                        {unit.pricePerSqft}/sq.ft
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant={unit.featured ? 'contained' : 'outlined'}
                        color="secondary"
                        size="small"
                        onClick={() => handleGetPrice(unit.unitType)}
                        className={styles.priceButton}
                      >
                        Get Price
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>

        <Typography variant="body2" className={styles.disclaimer}>
          {pricingContent.disclaimer}
        </Typography>

        {/* EMI Calculator */}
        {pricingContent.emiCalculator.enabled && (
          <motion.div variants={itemVariants}>
            <Box className={styles.emiCalculator}>
              <Typography variant="h6" className={styles.emiTitle}>
                <Icon className={styles.emiIcon}>calculate</Icon>
                EMI Calculator
              </Typography>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box className={styles.sliderGroup}>
                    <Box className={styles.sliderHeader}>
                      <Typography variant="body2">Loan Amount</Typography>
                      <Typography variant="subtitle1" className={styles.sliderValue}>
                        {formatCurrency(loanAmount)}
                      </Typography>
                    </Box>
                    <Slider
                      value={loanAmount}
                      onChange={(e, value) => setLoanAmount(value)}
                      min={pricingContent.emiCalculator.minLoanAmount}
                      max={pricingContent.emiCalculator.maxLoanAmount}
                      step={500000}
                      className={styles.slider}
                    />
                  </Box>

                  <Box className={styles.sliderGroup}>
                    <Box className={styles.sliderHeader}>
                      <Typography variant="body2">Interest Rate</Typography>
                      <Typography variant="subtitle1" className={styles.sliderValue}>
                        {interestRate}%
                      </Typography>
                    </Box>
                    <Slider
                      value={interestRate}
                      onChange={(e, value) => setInterestRate(value)}
                      min={pricingContent.emiCalculator.minInterestRate}
                      max={pricingContent.emiCalculator.maxInterestRate}
                      step={0.1}
                      className={styles.slider}
                    />
                  </Box>

                  <Box className={styles.sliderGroup}>
                    <Box className={styles.sliderHeader}>
                      <Typography variant="body2">Loan Tenure</Typography>
                      <Typography variant="subtitle1" className={styles.sliderValue}>
                        {tenure} Years
                      </Typography>
                    </Box>
                    <Slider
                      value={tenure}
                      onChange={(e, value) => setTenure(value)}
                      min={pricingContent.emiCalculator.minTenure}
                      max={pricingContent.emiCalculator.maxTenure}
                      step={1}
                      className={styles.slider}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box className={styles.emiResult}>
                    <Box className={styles.emiMonthly}>
                      <Typography variant="overline">Monthly EMI</Typography>
                      <Typography variant="h3" className={styles.emiAmount}>
                        {formatCurrency(emi)}
                      </Typography>
                    </Box>
                    <Box className={styles.emiBreakdown}>
                      <Box className={styles.emiBreakdownItem}>
                        <Typography variant="body2">Principal Amount</Typography>
                        <Typography variant="subtitle1">{formatCurrency(loanAmount)}</Typography>
                      </Box>
                      <Box className={styles.emiBreakdownItem}>
                        <Typography variant="body2">Total Interest</Typography>
                        <Typography variant="subtitle1">{formatCurrency(totalInterest)}</Typography>
                      </Box>
                      <Box className={styles.emiBreakdownItem}>
                        <Typography variant="body2">Total Amount</Typography>
                        <Typography variant="subtitle1" className={styles.totalAmount}>
                          {formatCurrency(totalAmount)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        )}

        {/* Bank Partners */}
        <motion.div variants={itemVariants}>
          <Box className={styles.bankPartners}>
            <Typography variant="subtitle1" className={styles.bankTitle}>
              Home Loans Available From
            </Typography>
            <Box className={styles.bankLogos}>
              {pricingContent.bankPartners.map((bank, index) => (
                <Box key={index} className={styles.bankLogo}>
                  <Typography variant="body2" className={styles.bankName}>
                    {bank.name}
                  </Typography>
                  <Typography variant="caption" className={styles.bankRate}>
                    {bank.interestRate}
                  </Typography>
                </Box>
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
            startIcon={<Icon>currency_rupee</Icon>}
            onClick={() => openPopup('pricing')}
            className={styles.ctaButton}
          >
            {pricingContent.cta.primary.text}
          </Button>
        </Box>
      </motion.div>
    </SectionWrapper>
  );
};

export default Pricing;
