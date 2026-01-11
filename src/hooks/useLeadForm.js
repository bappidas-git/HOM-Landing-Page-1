/**
 * useLeadForm Hook
 * Custom hook for lead form functionality
 * Wraps LeadFormContext with additional utility functions
 */

import { useCallback, useMemo } from 'react';
import { useLeadFormContext } from '@/context/LeadFormContext';
import { FORM_SOURCES, SITE_VISIT_TIME_SLOTS, MEAL_PREFERENCE_OPTIONS } from '@/lib/constants';

/**
 * useLeadForm Hook
 * Provides lead form state and actions
 * @returns {Object} Lead form state and methods
 */
const useLeadForm = () => {
  const formContext = useLeadFormContext();

  const {
    // Form methods
    formMethods,
    register,
    control,
    errors,
    isValid,
    isDirty,
    watch,
    setValue,
    getValues,
    trigger,
    reset,

    // Submission
    handleSubmit,
    submitLead,
    isSubmitting,
    submitError,
    isSubmitted,
    submissionData,

    // Form source
    formSource,
    setFormSource,

    // Conditional fields
    wantsSiteVisit,
    wantsPickupDrop,
    wantsMeal,
    sameAsPickup,

    // Actions
    clearForm,
    clearError,
    prefillForm,

    // Tracking
    trackingData,
    isLoadingTracking,
    refreshTrackingData,
  } = formContext;

  /**
   * Get error message for a specific field
   * @param {string} fieldName - Field name
   * @returns {string|null} Error message or null
   */
  const getFieldError = useCallback((fieldName) => {
    return errors?.[fieldName]?.message || null;
  }, [errors]);

  /**
   * Check if a field has an error
   * @param {string} fieldName - Field name
   * @returns {boolean} True if field has error
   */
  const hasFieldError = useCallback((fieldName) => {
    return !!errors?.[fieldName];
  }, [errors]);

  /**
   * Get all form values
   * @returns {Object} Current form values
   */
  const formValues = useMemo(() => {
    return getValues();
  }, [getValues]);

  /**
   * Set form source to hero form
   */
  const setHeroFormSource = useCallback(() => {
    setFormSource(FORM_SOURCES.HERO_FORM);
  }, [setFormSource]);

  /**
   * Set form source to popup form
   */
  const setPopupFormSource = useCallback(() => {
    setFormSource(FORM_SOURCES.POPUP_FORM);
  }, [setFormSource]);

  /**
   * Set form source to CTA form
   */
  const setCTAFormSource = useCallback(() => {
    setFormSource(FORM_SOURCES.CTA_FORM);
  }, [setFormSource]);

  /**
   * Toggle site visit option
   */
  const toggleSiteVisit = useCallback(() => {
    const current = getValues('wantsSiteVisit');
    setValue('wantsSiteVisit', !current, { shouldDirty: true });

    // Clear related fields if disabling
    if (current) {
      setValue('siteVisitDate', null);
      setValue('siteVisitTime', '');
      setValue('wantsPickupDrop', false);
      setValue('pickupLocation', '');
      setValue('dropLocation', '');
      setValue('wantsMeal', false);
      setValue('mealPreference', '');
    }
  }, [getValues, setValue]);

  /**
   * Toggle pickup/drop option
   */
  const togglePickupDrop = useCallback(() => {
    const current = getValues('wantsPickupDrop');
    setValue('wantsPickupDrop', !current, { shouldDirty: true });

    // Clear related fields if disabling
    if (current) {
      setValue('pickupLocation', '');
      setValue('dropLocation', '');
      setValue('sameAsPickup', false);
    }
  }, [getValues, setValue]);

  /**
   * Toggle meal option
   */
  const toggleMeal = useCallback(() => {
    const current = getValues('wantsMeal');
    setValue('wantsMeal', !current, { shouldDirty: true });

    // Clear meal preference if disabling
    if (current) {
      setValue('mealPreference', '');
    }
  }, [getValues, setValue]);

  /**
   * Toggle same as pickup checkbox
   */
  const toggleSameAsPickup = useCallback(() => {
    const current = getValues('sameAsPickup');
    setValue('sameAsPickup', !current, { shouldDirty: true });

    if (!current) {
      const pickupLocation = getValues('pickupLocation');
      setValue('dropLocation', pickupLocation);
    } else {
      setValue('dropLocation', '');
    }
  }, [getValues, setValue]);

  /**
   * Set site visit date
   * @param {Date|string} date - Selected date
   */
  const setSiteVisitDate = useCallback((date) => {
    setValue('siteVisitDate', date, { shouldValidate: true, shouldDirty: true });
  }, [setValue]);

  /**
   * Set site visit time
   * @param {string} time - Selected time slot
   */
  const setSiteVisitTime = useCallback((time) => {
    setValue('siteVisitTime', time, { shouldValidate: true, shouldDirty: true });
  }, [setValue]);

  /**
   * Set meal preference
   * @param {string} preference - Selected meal preference
   */
  const setMealPreference = useCallback((preference) => {
    setValue('mealPreference', preference, { shouldValidate: true, shouldDirty: true });
  }, [setValue]);

  /**
   * Get minimum date for site visit (tomorrow)
   * @returns {Date} Minimum date
   */
  const minSiteVisitDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  }, []);

  /**
   * Get maximum date for site visit (30 days from now)
   * @returns {Date} Maximum date
   */
  const maxSiteVisitDate = useMemo(() => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    maxDate.setHours(23, 59, 59, 999);
    return maxDate;
  }, []);

  /**
   * Get available time slots
   * @returns {Array} Available time slots
   */
  const availableTimeSlots = useMemo(() => {
    return SITE_VISIT_TIME_SLOTS;
  }, []);

  /**
   * Get meal preference options
   * @returns {Array} Meal preference options
   */
  const mealOptions = useMemo(() => {
    return MEAL_PREFERENCE_OPTIONS;
  }, []);

  /**
   * Check if form can be submitted
   * @returns {boolean} True if form can be submitted
   */
  const canSubmit = useMemo(() => {
    return isValid && !isSubmitting && !isSubmitted;
  }, [isValid, isSubmitting, isSubmitted]);

  /**
   * Get submit button text
   * @returns {string} Submit button text
   */
  const submitButtonText = useMemo(() => {
    if (isSubmitting) return 'Submitting...';
    if (isSubmitted) return 'Submitted';
    if (wantsSiteVisit) return 'Book Site Visit';
    return 'Submit Enquiry';
  }, [isSubmitting, isSubmitted, wantsSiteVisit]);

  /**
   * Get form progress percentage
   * @returns {number} Progress percentage (0-100)
   */
  const formProgress = useMemo(() => {
    const values = getValues();
    const requiredFields = ['name', 'email', 'mobile'];
    const filledRequired = requiredFields.filter((field) => values[field] && values[field].length > 0).length;

    return Math.round((filledRequired / requiredFields.length) * 100);
  }, [getValues]);

  return {
    // Form methods
    formMethods,
    register,
    control,
    errors,
    isValid,
    isDirty,
    watch,
    setValue,
    getValues,
    trigger,
    reset,

    // Submission
    handleSubmit,
    submitLead,
    isSubmitting,
    submitError,
    isSubmitted,
    submissionData,

    // Form source
    formSource,
    setFormSource,
    setHeroFormSource,
    setPopupFormSource,
    setCTAFormSource,

    // Conditional fields state
    wantsSiteVisit,
    wantsPickupDrop,
    wantsMeal,
    sameAsPickup,

    // Toggle actions
    toggleSiteVisit,
    togglePickupDrop,
    toggleMeal,
    toggleSameAsPickup,

    // Setters
    setSiteVisitDate,
    setSiteVisitTime,
    setMealPreference,

    // Options & constraints
    minSiteVisitDate,
    maxSiteVisitDate,
    availableTimeSlots,
    mealOptions,

    // Utility
    getFieldError,
    hasFieldError,
    formValues,
    canSubmit,
    submitButtonText,
    formProgress,

    // Actions
    clearForm,
    clearError,
    prefillForm,

    // Tracking
    trackingData,
    isLoadingTracking,
    refreshTrackingData,
  };
};

export default useLeadForm;
