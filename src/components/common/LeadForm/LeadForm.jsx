/**
 * LeadForm Component
 * Lead capture form with validation and conditional fields
 */

import { useEffect, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
  Checkbox,
  CircularProgress,
  Alert,
  Collapse,
  InputAdornment,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { addDays, startOfTomorrow } from 'date-fns';
import { Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useLeadFormContext } from '@/context/LeadFormContext';
import { SITE_VISIT_TIME_SLOTS, MEAL_OPTIONS } from '@/lib/constants';
import styles from './LeadForm.module.css';

/**
 * LeadForm component
 * @param {Object} props - Component props
 * @param {string} props.source - Form source identifier
 * @param {string} props.title - Form title
 * @param {string} props.subtitle - Form subtitle
 * @param {boolean} props.showSiteVisit - Whether to show site visit toggle initially
 * @param {boolean} props.compact - Whether to use compact layout
 * @param {string} props.variant - Form variant: 'default' | 'dark' | 'light'
 * @param {function} props.onSuccess - Callback on successful submission
 * @param {string} props.className - Additional CSS class
 */
const LeadForm = ({
  source = 'hero_form',
  title,
  subtitle,
  showSiteVisit = false,
  compact = false,
  variant = 'default',
  onSuccess,
  className,
}) => {
  const {
    formMethods: { control },
    register,
    errors,
    handleSubmit,
    isSubmitting,
    submitError,
    clearError,
    wantsSiteVisit,
    wantsPickupDrop,
    wantsMeal,
    sameAsPickup,
    setFormSource,
    setValue,
    watch,
  } = useLeadFormContext();

  // Set form source on mount
  useEffect(() => {
    setFormSource(source);
  }, [source, setFormSource]);

  // Animation variants
  const fieldVariants = {
    hidden: { opacity: 0, height: 0, marginBottom: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      marginBottom: 16,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      height: 0,
      marginBottom: 0,
      transition: { duration: 0.2 },
    },
  };

  // Handle form submit
  const onSubmit = useCallback(async (data) => {
    const result = await handleSubmit();
    if (result?.success && onSuccess) {
      onSuccess(result.data);
    }
  }, [handleSubmit, onSuccess]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={clsx(
        styles.form,
        styles[variant],
        { [styles.compact]: compact },
        className
      )}
      noValidate
    >
      {/* Form Header */}
      {(title || subtitle) && (
        <Box className={styles.header}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </Box>
      )}

      {/* Error Alert */}
      <Collapse in={!!submitError}>
        <Alert
          severity="error"
          onClose={clearError}
          className={styles.alert}
        >
          {submitError}
        </Alert>
      </Collapse>

      {/* Name Field */}
      <TextField
        {...register('name')}
        label="Your Name"
        placeholder="Enter your full name"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        className={styles.field}
        InputProps={{
          className: styles.input,
        }}
      />

      {/* Mobile Field */}
      <TextField
        {...register('mobile')}
        label="Mobile Number"
        placeholder="10-digit mobile number"
        fullWidth
        error={!!errors.mobile}
        helperText={errors.mobile?.message}
        className={styles.field}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">+91</InputAdornment>
          ),
          className: styles.input,
        }}
        inputProps={{
          maxLength: 10,
          inputMode: 'numeric',
        }}
      />

      {/* Email Field */}
      <TextField
        {...register('email')}
        label="Email Address"
        placeholder="your@email.com"
        type="email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        className={styles.field}
        InputProps={{
          className: styles.input,
        }}
      />

      {/* Message Field */}
      <TextField
        {...register('message')}
        label="Message (Optional)"
        placeholder="Any specific requirements?"
        fullWidth
        multiline
        rows={compact ? 2 : 3}
        error={!!errors.message}
        helperText={errors.message?.message}
        className={styles.field}
        InputProps={{
          className: styles.input,
        }}
        inputProps={{
          maxLength: 500,
        }}
      />

      {/* Site Visit Toggle */}
      <FormControlLabel
        control={
          <Controller
            name="wantsSiteVisit"
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                checked={field.value}
                color="secondary"
              />
            )}
          />
        }
        label="I want to schedule a site visit"
        className={styles.toggle}
      />

      {/* Site Visit Fields */}
      <AnimatePresence>
        {wantsSiteVisit && (
          <motion.div
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.conditionalFields}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {/* Date Picker */}
              <Controller
                name="siteVisitDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Preferred Date"
                    minDate={startOfTomorrow()}
                    maxDate={addDays(new Date(), 30)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.siteVisitDate,
                        helperText: errors.siteVisitDate?.message,
                        className: styles.field,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            {/* Time Slot */}
            <FormControl
              fullWidth
              error={!!errors.siteVisitTime}
              className={styles.field}
            >
              <InputLabel>Preferred Time</InputLabel>
              <Controller
                name="siteVisitTime"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Preferred Time">
                    {SITE_VISIT_TIME_SLOTS.map((slot) => (
                      <MenuItem key={slot.value} value={slot.value}>
                        {slot.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.siteVisitTime && (
                <FormHelperText>{errors.siteVisitTime.message}</FormHelperText>
              )}
            </FormControl>

            {/* Pickup/Drop Toggle */}
            <FormControlLabel
              control={
                <Controller
                  name="wantsPickupDrop"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      color="secondary"
                    />
                  )}
                />
              }
              label="I want free pickup & drop service"
              className={styles.toggle}
            />

            {/* Pickup/Drop Fields */}
            <AnimatePresence>
              {wantsPickupDrop && (
                <motion.div
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <TextField
                    {...register('pickupLocation')}
                    label="Pickup Location"
                    placeholder="Enter pickup address"
                    fullWidth
                    error={!!errors.pickupLocation}
                    helperText={errors.pickupLocation?.message}
                    className={styles.field}
                  />

                  <FormControlLabel
                    control={
                      <Controller
                        name="sameAsPickup"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            {...field}
                            checked={field.value}
                            color="secondary"
                          />
                        )}
                      />
                    }
                    label="Drop location same as pickup"
                    className={styles.checkbox}
                  />

                  {!sameAsPickup && (
                    <TextField
                      {...register('dropLocation')}
                      label="Drop Location"
                      placeholder="Enter drop address"
                      fullWidth
                      error={!!errors.dropLocation}
                      helperText={errors.dropLocation?.message}
                      className={styles.field}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Meal Preference Toggle */}
            <FormControlLabel
              control={
                <Controller
                  name="wantsMeal"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      color="secondary"
                    />
                  )}
                />
              }
              label="I would like complimentary refreshments"
              className={styles.toggle}
            />

            {/* Meal Options */}
            <AnimatePresence>
              {wantsMeal && (
                <motion.div
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <FormControl
                    component="fieldset"
                    error={!!errors.mealPreference}
                    className={styles.radioGroup}
                  >
                    <FormLabel component="legend">Meal Preference</FormLabel>
                    <Controller
                      name="mealPreference"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          {MEAL_OPTIONS.map((option) => (
                            <FormControlLabel
                              key={option.value}
                              value={option.value}
                              control={<Radio color="secondary" />}
                              label={option.label}
                            />
                          ))}
                        </RadioGroup>
                      )}
                    />
                    {errors.mealPreference && (
                      <FormHelperText>
                        {errors.mealPreference.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        size="large"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Submit Enquiry'
        )}
      </Button>

      {/* Privacy Note */}
      <p className={styles.privacyNote}>
        By submitting, you agree to our{' '}
        <a href="/privacy-policy">Privacy Policy</a> and consent to receive
        communications about Nambiar District 25.
      </p>
    </Box>
  );
};

export default LeadForm;
