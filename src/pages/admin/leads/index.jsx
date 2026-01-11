/**
 * Admin Leads Page
 * Leads management with data table, filters, and actions
 */

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
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
import LeadsTable from '@/components/admin/LeadsTable';
import { withAuth } from '@/context/AuthContext';
import { getLeads, deleteLead, bulkUpdateLeads, bulkDeleteLeads } from '@/lib/api/leads';

// Enhanced mock data with more realistic entries
const mockLeads = [
  { id: 1, name: 'Rahul Kumar', email: 'rahul.kumar@email.com', mobile: '9876543210', source: 'hero_form', status: 'new', priority: 'high', wantsSiteVisit: true, siteVisitDate: '2026-01-15', createdAt: '2026-01-11T10:30:00' },
  { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', mobile: '9876543211', source: 'popup_form', status: 'contacted', priority: 'medium', wantsSiteVisit: false, createdAt: '2026-01-11T09:15:00' },
  { id: 3, name: 'Amit Singh', email: 'amit.singh@email.com', mobile: '9876543212', source: 'cta_form', status: 'site_visit_scheduled', priority: 'high', wantsSiteVisit: true, siteVisitDate: '2026-01-14', createdAt: '2026-01-10T16:45:00' },
  { id: 4, name: 'Deepika Patel', email: 'deepika.patel@email.com', mobile: '9876543213', source: 'hero_form', status: 'visited', priority: 'high', wantsSiteVisit: true, createdAt: '2026-01-10T14:20:00' },
  { id: 5, name: 'Vikram Reddy', email: 'vikram.reddy@email.com', mobile: '9876543214', source: 'popup_form', status: 'negotiation', priority: 'high', wantsSiteVisit: false, createdAt: '2026-01-10T11:00:00' },
  { id: 6, name: 'Sneha Nair', email: 'sneha.nair@email.com', mobile: '9876543215', source: 'hero_form', status: 'converted', priority: 'medium', wantsSiteVisit: true, createdAt: '2026-01-09T15:30:00' },
  { id: 7, name: 'Rajesh Gupta', email: 'rajesh.gupta@email.com', mobile: '9876543216', source: 'cta_form', status: 'lost', priority: 'low', wantsSiteVisit: false, createdAt: '2026-01-09T12:00:00' },
  { id: 8, name: 'Ananya Krishnan', email: 'ananya.k@email.com', mobile: '9876543217', source: 'hero_form', status: 'new', priority: 'medium', wantsSiteVisit: true, siteVisitDate: '2026-01-16', createdAt: '2026-01-09T10:00:00' },
  { id: 9, name: 'Suresh Menon', email: 'suresh.menon@email.com', mobile: '9876543218', source: 'popup_form', status: 'contacted', priority: 'low', wantsSiteVisit: false, createdAt: '2026-01-08T15:45:00' },
  { id: 10, name: 'Kavitha Rao', email: 'kavitha.rao@email.com', mobile: '9876543219', source: 'cta_form', status: 'site_visit_scheduled', priority: 'high', wantsSiteVisit: true, siteVisitDate: '2026-01-13', createdAt: '2026-01-08T11:30:00' },
  { id: 11, name: 'Arun Prakash', email: 'arun.prakash@email.com', mobile: '9876543220', source: 'hero_form', status: 'visited', priority: 'medium', wantsSiteVisit: true, createdAt: '2026-01-07T16:20:00' },
  { id: 12, name: 'Meera Iyer', email: 'meera.iyer@email.com', mobile: '9876543221', source: 'popup_form', status: 'negotiation', priority: 'high', wantsSiteVisit: true, createdAt: '2026-01-07T14:00:00' },
  { id: 13, name: 'Karthik Sundaram', email: 'karthik.s@email.com', mobile: '9876543222', source: 'cta_form', status: 'new', priority: 'medium', wantsSiteVisit: false, createdAt: '2026-01-06T09:30:00' },
  { id: 14, name: 'Lakshmi Venkat', email: 'lakshmi.v@email.com', mobile: '9876543223', source: 'hero_form', status: 'converted', priority: 'high', wantsSiteVisit: true, createdAt: '2026-01-05T12:15:00' },
  { id: 15, name: 'Naveen Kumar', email: 'naveen.kumar@email.com', mobile: '9876543224', source: 'popup_form', status: 'contacted', priority: 'medium', wantsSiteVisit: false, createdAt: '2026-01-05T10:45:00' },
];

/**
 * Admin Leads Page Component
 */
const AdminLeadsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, leadId: null, isBulk: false, ids: [] });

  // Load leads data
  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      // In a real app, fetch from API
      // const response = await getLeads();
      // setLeads(response.data);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      setLeads(mockLeads);
    } catch (error) {
      console.error('Failed to load leads:', error);
      showSnackbar('Failed to load leads', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  // Show snackbar notification
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Handle view lead
  const handleViewLead = (id) => {
    router.push(`/admin/leads/${id}`);
  };

  // Handle edit lead
  const handleEditLead = (id) => {
    router.push(`/admin/leads/${id}?edit=true`);
  };

  // Handle delete lead
  const handleDeleteLead = (id) => {
    setDeleteDialog({ open: true, leadId: id, isBulk: false, ids: [] });
  };

  // Handle bulk delete
  const handleBulkDelete = (ids) => {
    setDeleteDialog({ open: true, leadId: null, isBulk: true, ids });
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      if (deleteDialog.isBulk) {
        // In real app: await bulkDeleteLeads(deleteDialog.ids);
        setLeads(leads.filter(lead => !deleteDialog.ids.includes(lead.id)));
        showSnackbar(`${deleteDialog.ids.length} leads deleted successfully`);
      } else {
        // In real app: await deleteLead(deleteDialog.leadId);
        setLeads(leads.filter(lead => lead.id !== deleteDialog.leadId));
        showSnackbar('Lead deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      showSnackbar('Failed to delete lead(s)', 'error');
    } finally {
      setDeleteDialog({ open: false, leadId: null, isBulk: false, ids: [] });
    }
  };

  // Handle bulk status change
  const handleBulkStatusChange = async (ids, status) => {
    try {
      // In real app: await bulkUpdateLeads(ids, { status });
      setLeads(leads.map(lead =>
        ids.includes(lead.id) ? { ...lead, status } : lead
      ));
      showSnackbar(`${ids.length} leads updated to ${status.replace('_', ' ')}`);
    } catch (error) {
      console.error('Failed to update status:', error);
      showSnackbar('Failed to update lead status', 'error');
    }
  };

  // Handle export
  const handleExport = (dataToExport) => {
    const headers = ['ID', 'Name', 'Email', 'Mobile', 'Source', 'Status', 'Priority', 'Site Visit', 'Created At'];
    const rows = dataToExport.map(lead => [
      lead.id,
      lead.name,
      lead.email,
      lead.mobile,
      lead.source,
      lead.status,
      lead.priority,
      lead.wantsSiteVisit ? 'Yes' : 'No',
      lead.createdAt,
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell || ''}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    showSnackbar(`${dataToExport.length} leads exported successfully`);
  };

  return (
    <AdminLayout title="Leads">
      <Head>
        <title>Leads Management | Admin - Nambiar District 25</title>
      </Head>

      <Box>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a2e', mb: 0.5 }}>
            Leads Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage, track, and convert all your leads in one place
          </Typography>
        </Box>

        {/* Leads Table with all features */}
        <LeadsTable
          leads={leads}
          loading={loading}
          title="All Leads"
          onView={handleViewLead}
          onEdit={handleEditLead}
          onDelete={handleDeleteLead}
          onBulkDelete={handleBulkDelete}
          onBulkStatusChange={handleBulkStatusChange}
          onExport={handleExport}
          onRefresh={loadLeads}
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, leadId: null, isBulk: false, ids: [] })}
      >
        <DialogTitle>
          {deleteDialog.isBulk ? 'Delete Selected Leads?' : 'Delete Lead?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteDialog.isBulk
              ? `Are you sure you want to delete ${deleteDialog.ids.length} selected leads? This action cannot be undone.`
              : 'Are you sure you want to delete this lead? This action cannot be undone.'
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, leadId: null, isBulk: false, ids: [] })}>
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

export default withAuth(AdminLeadsPage);
