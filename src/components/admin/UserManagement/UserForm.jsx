/**
 * UserForm Component
 * Form for creating and editing users
 */

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  FormHelperText,
  Typography,
  Chip,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { getRoleOptions, ROLE_COLORS } from '@/lib/constants/permissions';

const UserForm = ({ open, onClose, onSubmit, user, loading }) => {
  const isEditMode = !!user;
  const roleOptions = getRoleOptions();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'sales_executive',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Reset form when dialog opens/closes or user changes
  useEffect(() => {
    if (open) {
      if (user) {
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          role: user.role || 'sales_executive',
          password: '',
          confirmPassword: '',
        });
      } else {
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: 'sales_executive',
          password: '',
          confirmPassword: '',
        });
      }
      setErrors({});
      setSubmitError('');
    }
  }, [open, user]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation (optional but if provided, validate format)
    if (formData.phone && !/^[+]?[\d\s-]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid phone number format';
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    // Password validation (required only for new users)
    if (!isEditMode) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      // For edit mode, validate passwords only if provided
      if (formData.password) {
        if (formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    setSubmitError('');
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const submitData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      role: formData.role,
    };

    // Include password only if provided
    if (formData.password) {
      submitData.password = formData.password;
    }

    const result = await onSubmit(submitData);

    if (result?.error) {
      setSubmitError(result.error);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'sales_executive',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setSubmitError('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon
            icon={isEditMode ? 'mdi:account-edit' : 'mdi:account-plus'}
            style={{ fontSize: 24, color: '#667eea' }}
          />
          <Typography variant="h6" component="span">
            {isEditMode ? 'Edit User' : 'Add New User'}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
          {/* Name */}
          <TextField
            label="Full Name"
            value={formData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:account" style={{ color: '#9e9e9e' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Email */}
          <TextField
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:email" style={{ color: '#9e9e9e' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Phone */}
          <TextField
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange('phone')}
            error={!!errors.phone}
            helperText={errors.phone || 'Optional'}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="mdi:phone" style={{ color: '#9e9e9e' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Role */}
          <FormControl fullWidth error={!!errors.role} required>
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={handleChange('role')}
              label="Role"
              disabled={isEditMode && user?.id === 1} // Can't change admin role
            >
              {roleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: option.color,
                      }}
                    />
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            {isEditMode && user?.id === 1 && (
              <FormHelperText>Primary admin role cannot be changed</FormHelperText>
            )}
          </FormControl>

          {/* Role Description */}
          <Box sx={{ p: 1.5, bgcolor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              <strong>Role Permissions:</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary" component="div" sx={{ mt: 0.5 }}>
              {formData.role === 'admin' ? (
                'Full access to all modules including user management'
              ) : (
                'Full access to Dashboard and Leads, read-only access to other modules'
              )}
            </Typography>
          </Box>

          {/* Password Section */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
              {isEditMode ? 'Change Password (leave blank to keep current)' : 'Set Password'}
            </Typography>

            {/* Password */}
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange('password')}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              required={!isEditMode}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="mdi:lock" style={{ color: '#9e9e9e' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      <Icon icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password */}
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              fullWidth
              required={!isEditMode}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon icon="mdi:lock-check" style={{ color: '#9e9e9e' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small"
                    >
                      <Icon icon={showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? null : <Icon icon={isEditMode ? 'mdi:check' : 'mdi:plus'} />
          }
          sx={{
            bgcolor: '#667eea',
            '&:hover': { bgcolor: '#5a6fd6' },
          }}
        >
          {loading ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add User'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
