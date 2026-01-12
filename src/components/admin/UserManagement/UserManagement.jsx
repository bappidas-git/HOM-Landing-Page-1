/**
 * UserManagement Component
 * Main component for managing users
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import { Icon } from '@iconify/react';
import UserTable from './UserTable';
import UserForm from './UserForm';
import { useAuthContext } from '@/context/AuthContext';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from '@/lib/api/users';
import { ROLE_LABELS, ROLE_COLORS } from '@/lib/constants/permissions';

const UserManagement = () => {
  const { user: currentUser, isAdmin } = useAuthContext();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch users on mount
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        showSnackbar('Failed to fetch users', 'error');
      }
    } catch (error) {
      showSnackbar('Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleAddClick = () => {
    setSelectedUser(null);
    setFormOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      let response;

      if (selectedUser) {
        // Update existing user
        response = await updateUser(selectedUser.id, formData);
        if (response.success) {
          showSnackbar('User updated successfully');
          handleFormClose();
          fetchUsers();
        } else {
          return { error: response.error || 'Failed to update user' };
        }
      } else {
        // Create new user
        response = await createUser(formData);
        if (response.success) {
          showSnackbar('User created successfully');
          handleFormClose();
          fetchUsers();
        } else {
          return { error: response.error || 'Failed to create user' };
        }
      }
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    } finally {
      setFormLoading(false);
    }

    return {};
  };

  const handleDelete = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.success) {
        showSnackbar('User deleted successfully');
        fetchUsers();
      } else {
        showSnackbar(response.error || 'Failed to delete user', 'error');
      }
    } catch (error) {
      showSnackbar('Failed to delete user', 'error');
    }
  };

  const handleToggleStatus = async (userId, isActive) => {
    try {
      const response = await toggleUserStatus(userId, isActive);
      if (response.success) {
        showSnackbar(`User ${isActive ? 'activated' : 'deactivated'} successfully`);
        fetchUsers();
      } else {
        showSnackbar(response.error || 'Failed to update user status', 'error');
      }
    } catch (error) {
      showSnackbar('Failed to update user status', 'error');
    }
  };

  // Calculate stats
  const stats = {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    admins: users.filter((u) => u.role === 'admin').length,
    others: users.filter((u) => u.role !== 'admin').length,
  };

  // Role distribution
  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  if (!isAdmin) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          You do not have permission to access this page.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            User Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage user accounts and permissions
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Icon icon="mdi:plus" />}
          onClick={handleAddClick}
          sx={{
            bgcolor: '#667eea',
            '&:hover': { bgcolor: '#5a6fd6' },
          }}
        >
          Add User
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Card
            elevation={0}
            sx={{
              bgcolor: 'rgba(102, 126, 234, 0.1)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Icon
                icon="mdi:account-group"
                style={{ fontSize: 32, color: '#667eea' }}
              />
              <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card
            elevation={0}
            sx={{
              bgcolor: 'rgba(76, 175, 80, 0.1)',
              border: '1px solid rgba(76, 175, 80, 0.2)',
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Icon
                icon="mdi:account-check"
                style={{ fontSize: 32, color: '#4caf50' }}
              />
              <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                {stats.active}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card
            elevation={0}
            sx={{
              bgcolor: 'rgba(25, 118, 210, 0.1)',
              border: '1px solid rgba(25, 118, 210, 0.2)',
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Icon
                icon="mdi:shield-account"
                style={{ fontSize: 32, color: '#1976d2' }}
              />
              <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                {stats.admins}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Admins
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card
            elevation={0}
            sx={{
              bgcolor: 'rgba(255, 152, 0, 0.1)',
              border: '1px solid rgba(255, 152, 0, 0.2)',
            }}
          >
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Icon
                icon="mdi:account-multiple"
                style={{ fontSize: 32, color: '#ff9800' }}
              />
              <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                {stats.others}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Other Roles
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Role Distribution */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5 }}>
          Role Distribution
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Object.entries(roleDistribution).map(([role, count]) => (
            <Box
              key={role}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1,
                bgcolor: `${ROLE_COLORS[role] || '#9e9e9e'}10`,
                borderRadius: 1,
                border: '1px solid',
                borderColor: `${ROLE_COLORS[role] || '#9e9e9e'}30`,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: ROLE_COLORS[role] || '#9e9e9e',
                }}
              />
              <Typography variant="body2" fontWeight={500}>
                {ROLE_LABELS[role] || role}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={700}
                sx={{ color: ROLE_COLORS[role] || '#9e9e9e' }}
              >
                {count}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Users Table */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <UserTable
          users={users}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDelete}
          onToggleStatus={handleToggleStatus}
          currentUserId={currentUser?.id}
        />
      </Paper>

      {/* User Form Dialog */}
      <UserForm
        open={formOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        loading={formLoading}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
