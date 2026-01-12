/**
 * Admin Lead Detail Page
 * View and manage individual lead details with comprehensive UI
 */

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import AdminLayout from '@/components/admin/AdminLayout';
import LeadDetail from '@/components/admin/LeadDetail';
import { withAuth } from '@/context/AuthContext';
import { getLead, updateLead, deleteLead, addLeadNote } from '@/lib/api/leads';

// Enhanced mock lead data for development
const getMockLead = (id) => ({
  id: parseInt(id) || 1,
  name: 'Rahul Kumar',
  email: 'rahul.kumar@email.com',
  mobile: '9876543210',
  message: 'Interested in 3BHK apartments. Looking for something within 2 Cr budget. Prefer east-facing with good ventilation.',
  source: 'hero_form',
  status: 'contacted',
  priority: 'high',
  wantsSiteVisit: true,
  siteVisitDate: '2026-01-15',
  siteVisitTime: '10:00 AM',
  wantsPickupDrop: true,
  pickupLocation: 'Koramangala, Bangalore',
  dropLocation: 'Same as pickup',
  wantsMeal: true,
  mealPreference: 'lunch',
  ipAddress: '103.45.67.89',
  city: 'Bangalore',
  state: 'Karnataka',
  country: 'India',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
  utmSource: 'google',
  utmMedium: 'cpc',
  utmCampaign: 'district25_jan',
  notes: [
    { id: 1, text: 'Initial call made. Customer is interested in 3BHK premium apartments.', createdAt: '2026-01-11T10:00:00', createdBy: 'Sales Team' },
    { id: 2, text: 'Discussed pricing and payment plans. Very interested, requested site visit.', createdAt: '2026-01-11T11:30:00', createdBy: 'Admin' },
    { id: 3, text: 'Site visit confirmed for January 15th at 10 AM. Pickup arranged from Koramangala.', createdAt: '2026-01-11T14:00:00', createdBy: 'Admin' },
  ],
  followUpDate: '2026-01-16T09:00:00',
  createdAt: '2026-01-10T14:30:00',
  updatedAt: '2026-01-11T14:00:00',
});

/**
 * Admin Lead Detail Page Component
 */
const AdminLeadDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false });

  // Show snackbar notification
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Load lead data
  const loadLead = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      // In a real app, fetch from API
      // const response = await getLead(id);
      // setLead(response.data);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setLead(getMockLead(id));
    } catch (error) {
      console.error('Failed to load lead:', error);
      showSnackbar('Failed to load lead details', 'error');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadLead();
  }, [loadLead]);

  // Handle go back
  const handleBack = () => {
    router.push('/admin/leads');
  };

  // Handle save changes
  const handleSave = async (leadId, updates) => {
    try {
      // In real app: await updateLead(leadId, updates);
      setLead(prev => ({ ...prev, ...updates }));
      showSnackbar('Lead updated successfully');
    } catch (error) {
      console.error('Failed to update lead:', error);
      showSnackbar('Failed to update lead', 'error');
    }
  };

  // Handle status change
  const handleStatusChange = async (leadId, status) => {
    try {
      // In real app: await updateLead(leadId, { status });
      setLead(prev => ({ ...prev, status }));
      showSnackbar(`Status updated to ${status.replace('_', ' ')}`);
    } catch (error) {
      console.error('Failed to update status:', error);
      showSnackbar('Failed to update status', 'error');
    }
  };

  // Handle priority change
  const handlePriorityChange = async (leadId, priority) => {
    try {
      // In real app: await updateLead(leadId, { priority });
      setLead(prev => ({ ...prev, priority }));
      showSnackbar(`Priority updated to ${priority}`);
    } catch (error) {
      console.error('Failed to update priority:', error);
      showSnackbar('Failed to update priority', 'error');
    }
  };

  // Handle add note
  const handleAddNote = async (leadId, noteText) => {
    try {
      // In real app: await addLeadNote(leadId, noteText);
      const newNote = {
        id: Date.now(),
        text: noteText,
        createdAt: new Date().toISOString(),
        createdBy: 'Admin',
      };
      setLead(prev => ({
        ...prev,
        notes: [newNote, ...(prev.notes || [])],
      }));
      showSnackbar('Note added successfully');
    } catch (error) {
      console.error('Failed to add note:', error);
      showSnackbar('Failed to add note', 'error');
    }
  };

  // Handle schedule follow-up
  const handleScheduleFollowUp = async (leadId, followUpDate) => {
    try {
      // In real app: await updateLead(leadId, { followUpDate });
      setLead(prev => ({ ...prev, followUpDate }));
      showSnackbar('Follow-up scheduled successfully');
    } catch (error) {
      console.error('Failed to schedule follow-up:', error);
      showSnackbar('Failed to schedule follow-up', 'error');
    }
  };

  // Handle delete initiation
  const handleDelete = () => {
    setDeleteDialog({ open: true });
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      // In real app: await deleteLead(id);
      showSnackbar('Lead deleted successfully');
      setDeleteDialog({ open: false });
      router.push('/admin/leads');
    } catch (error) {
      console.error('Failed to delete lead:', error);
      showSnackbar('Failed to delete lead', 'error');
    }
  };

  return (
    <AdminLayout title="Lead Details">
      <Head>
        <title>{`${lead?.name ? `${lead.name} | Lead Details` : 'Lead Details'} | Admin - Nambiar District 25`}</title>
      </Head>

      <Box>
        <LeadDetail
          lead={lead}
          loading={loading}
          onBack={handleBack}
          onSave={handleSave}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onAddNote={handleAddNote}
          onScheduleFollowUp={handleScheduleFollowUp}
          onDelete={handleDelete}
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false })}
      >
        <DialogTitle>Delete Lead?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this lead? This action cannot be undone and all associated notes and history will be permanently removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false })}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
};

export default withAuth(AdminLeadDetailPage);
