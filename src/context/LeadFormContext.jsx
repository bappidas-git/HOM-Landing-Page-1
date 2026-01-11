/**
 * Lead Form Context Provider
 * Manages lead form state, validation, and submission
 */

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { leadFormSchema } from '@/lib/utils/validation';
import { submitLeadWithDuplicateCheck } from '@/lib/api/leads';
import { getTrackingData, getUserAgent } from '@/lib/utils/ipAddress';
import {
  saveFormDraft,
  getFormDraft,
  clearFormDraft,
  markFormSubmitted,
  wasFormSubmitted,
  getUtmParams,
  captureUtmParams,
} from '@/lib/utils/storage';
import { performFullValidation, recordSubmission } from '@/lib/utils/duplicateCheck';
import { FORM_SOURCES, PUBLIC_ROUTES } from '@/lib/constants';

/**
 * Lead Form Context
 */
const LeadFormContext = createContext(null);

/**
 * Default form values
 */
const defaultFormValues = {
  name: '',
  email: '',
  mobile: '',
  message: '',
  wantsSiteVisit: false,
  siteVisitDate: null,
  siteVisitTime: '',
  wantsPickupDrop: false,
  pickupLocation: '',
  dropLocation: '',
  sameAsPickup: false,
  wantsMeal: false,
  mealPreference: '',
};

/**
 * Lead Form Provider Component
 */
export const LeadFormProvider = ({ children }) => {
  const router = useRouter();

  // Form state using react-hook-form
  const formMethods = useForm({
    resolver: yupResolver(leadFormSchema),
    defaultValues: defaultFormValues,
    mode: 'onBlur',
  });

  const {
    formState: { errors, isValid, isDirty, isSubmitting: isFormSubmitting },
    reset,
    watch,
    setValue,
    getValues,
    trigger,
    handleSubmit: rhfHandleSubmit,
  } = formMethods;

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

  // Form source (where the form was opened from)
  const [formSource, setFormSource] = useState(FORM_SOURCES.HERO_FORM);

  // Tracking data
  const [trackingData, setTrackingData] = useState(null);
  const [isLoadingTracking, setIsLoadingTracking] = useState(false);

  // Watch form values for conditional fields
  const wantsSiteVisit = watch('wantsSiteVisit');
  const wantsPickupDrop = watch('wantsPickupDrop');
  const wantsMeal = watch('wantsMeal');
  const sameAsPickup = watch('sameAsPickup');

  /**
   * Initialize form and tracking on mount
   */
  useEffect(() => {
    // Capture UTM parameters from URL
    captureUtmParams();

    // Check if form was already submitted
    if (wasFormSubmitted()) {
      setIsSubmitted(true);
    }

    // Load form draft if exists
    const draft = getFormDraft();
    if (draft) {
      Object.keys(draft).forEach((key) => {
        if (defaultFormValues.hasOwnProperty(key)) {
          setValue(key, draft[key]);
        }
      });
    }

    // Fetch tracking data
    fetchTrackingData();
  }, [setValue]);

  /**
   * Auto-save form draft
   */
  useEffect(() => {
    if (isDirty) {
      const values = getValues();
      saveFormDraft(values);
    }
  }, [isDirty, getValues, watch()]);

  /**
   * Handle same as pickup checkbox
   */
  useEffect(() => {
    if (sameAsPickup) {
      const pickupLocation = getValues('pickupLocation');
      setValue('dropLocation', pickupLocation);
    }
  }, [sameAsPickup, setValue, getValues]);

  /**
   * Fetch tracking data (IP, location, device info)
   */
  const fetchTrackingData = useCallback(async () => {
    try {
      setIsLoadingTracking(true);
      const data = await getTrackingData();
      setTrackingData(data);
    } catch (error) {
      console.error('[LeadFormContext] Tracking data error:', error.message);
      // Set fallback tracking data
      setTrackingData({
        ipAddress: 'Unknown',
        location: { city: 'Unknown', state: 'Unknown', country: 'Unknown' },
        userAgent: getUserAgent(),
        deviceType: 'unknown',
      });
    } finally {
      setIsLoadingTracking(false);
    }
  }, []);

  /**
   * Build lead payload from form data
   * @param {Object} formData - Form data
   * @returns {Object} Lead payload
   */
  const buildLeadPayload = useCallback((formData) => {
    const utmParams = getUtmParams();

    return {
      // Basic info
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      mobile: formData.mobile.replace(/\D/g, ''),
      message: formData.message?.trim() || '',

      // Source
      source: formSource,

      // Site visit
      wantsSiteVisit: formData.wantsSiteVisit || false,
      siteVisitDate: formData.wantsSiteVisit ? formData.siteVisitDate : null,
      siteVisitTime: formData.wantsSiteVisit ? formData.siteVisitTime : null,

      // Pickup/Drop
      wantsPickupDrop: formData.wantsPickupDrop || false,
      pickupLocation: formData.wantsPickupDrop ? formData.pickupLocation : null,
      dropLocation: formData.wantsPickupDrop
        ? (formData.sameAsPickup ? formData.pickupLocation : formData.dropLocation)
        : null,

      // Meal
      wantsMeal: formData.wantsMeal || false,
      mealPreference: formData.wantsMeal ? formData.mealPreference : null,

      // Tracking
      ipAddress: trackingData?.ipAddress || 'Unknown',
      location: trackingData?.location || { city: 'Unknown', state: 'Unknown', country: 'Unknown' },
      userAgent: trackingData?.userAgent || getUserAgent(),
      deviceType: trackingData?.deviceType || 'unknown',

      // UTM Parameters
      utmSource: utmParams.utm_source || null,
      utmMedium: utmParams.utm_medium || null,
      utmCampaign: utmParams.utm_campaign || null,
      utmTerm: utmParams.utm_term || null,
      utmContent: utmParams.utm_content || null,

      // Status
      status: 'new',
      priority: formData.wantsSiteVisit ? 'high' : 'medium',
    };
  }, [formSource, trackingData]);

  /**
   * Submit lead form
   * @param {Object} formData - Form data
   * @returns {Promise<Object>} Submission result
   */
  const submitLead = useCallback(async (formData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Perform duplicate check
      const validation = await performFullValidation({
        mobile: formData.mobile,
        email: formData.email,
      });

      if (!validation.valid) {
        setSubmitError(validation.error);
        return { success: false, error: validation.error, errorType: validation.errorType };
      }

      // Build payload
      const payload = buildLeadPayload(formData);

      // Submit to API
      const result = await submitLeadWithDuplicateCheck(payload);

      if (result.success) {
        // Record submission locally
        await recordSubmission(formData.mobile, formData.email);

        // Mark as submitted
        markFormSubmitted();
        clearFormDraft();
        setIsSubmitted(true);
        setSubmissionData(result.data);

        // Reset form
        reset(defaultFormValues);

        // Redirect to thank you page
        router.push(PUBLIC_ROUTES.THANK_YOU);

        return { success: true, data: result.data };
      } else {
        setSubmitError(result.error);
        return { success: false, error: result.error, isDuplicate: result.isDuplicate };
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to submit form. Please try again.';
      setSubmitError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  }, [buildLeadPayload, reset, router]);

  /**
   * Handle form submission
   */
  const handleSubmit = rhfHandleSubmit(submitLead);

  /**
   * Clear form
   */
  const clearForm = useCallback(() => {
    reset(defaultFormValues);
    clearFormDraft();
    setSubmitError(null);
  }, [reset]);

  /**
   * Clear submission error
   */
  const clearError = useCallback(() => {
    setSubmitError(null);
  }, []);

  /**
   * Set form source
   * @param {string} source - Form source from FORM_SOURCES
   */
  const updateFormSource = useCallback((source) => {
    setFormSource(source);
  }, []);

  /**
   * Pre-fill form with data
   * @param {Object} data - Data to pre-fill
   */
  const prefillForm = useCallback((data) => {
    Object.keys(data).forEach((key) => {
      if (defaultFormValues.hasOwnProperty(key)) {
        setValue(key, data[key], { shouldDirty: true });
      }
    });
  }, [setValue]);

  /**
   * Context value
   */
  const value = useMemo(() => ({
    // Form methods
    formMethods,
    register: formMethods.register,
    control: formMethods.control,
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
    isSubmitting: isSubmitting || isFormSubmitting,
    submitError,
    isSubmitted,
    submissionData,

    // Form source
    formSource,
    setFormSource: updateFormSource,

    // Conditional field visibility
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
    refreshTrackingData: fetchTrackingData,
  }), [
    formMethods,
    errors,
    isValid,
    isDirty,
    watch,
    setValue,
    getValues,
    trigger,
    reset,
    handleSubmit,
    submitLead,
    isSubmitting,
    isFormSubmitting,
    submitError,
    isSubmitted,
    submissionData,
    formSource,
    updateFormSource,
    wantsSiteVisit,
    wantsPickupDrop,
    wantsMeal,
    sameAsPickup,
    clearForm,
    clearError,
    prefillForm,
    trackingData,
    isLoadingTracking,
    fetchTrackingData,
  ]);

  return (
    <LeadFormContext.Provider value={value}>
      {children}
    </LeadFormContext.Provider>
  );
};

/**
 * Hook to use lead form context
 * @returns {Object} Lead form context value
 * @throws {Error} If used outside of LeadFormProvider
 */
export const useLeadFormContext = () => {
  const context = useContext(LeadFormContext);

  if (!context) {
    throw new Error('useLeadFormContext must be used within a LeadFormProvider');
  }

  return context;
};

export default LeadFormContext;
