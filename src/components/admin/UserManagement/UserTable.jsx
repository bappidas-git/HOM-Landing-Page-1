/**
 * UserTable Component
 * Displays users in a table with actions
 */

import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TablePagination,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { ROLE_LABELS, ROLE_COLORS } from '@/lib/constants/permissions';

const UserTable = ({
  users,
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
  currentUserId,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ROLE_LABELS[user.role] || user.role).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate users
  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      onDelete(userToDelete.id);
    }
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <Typography color="text.secondary">Loading users...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Search */}
      <Box sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(0);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="mdi:magnify" style={{ color: '#9e9e9e' }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
              <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Last Login</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    {searchQuery ? 'No users found matching your search' : 'No users found'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    opacity: user.isActive ? 1 : 0.6,
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        src={user.avatar}
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: ROLE_COLORS[user.role] || '#9e9e9e',
                        }}
                      >
                        {user.name?.[0] || 'U'}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {user.name}
                          {user.id === currentUserId && (
                            <Chip
                              label="You"
                              size="small"
                              sx={{
                                ml: 1,
                                height: 18,
                                fontSize: '0.65rem',
                                bgcolor: 'primary.main',
                                color: 'white',
                              }}
                            />
                          )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {user.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={ROLE_LABELS[user.role] || user.role}
                      size="small"
                      sx={{
                        bgcolor: `${ROLE_COLORS[user.role] || '#9e9e9e'}15`,
                        color: ROLE_COLORS[user.role] || '#9e9e9e',
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.phone || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Switch
                        size="small"
                        checked={user.isActive}
                        onChange={() => onToggleStatus(user.id, !user.isActive)}
                        disabled={user.id === 1} // Can't deactivate primary admin
                        color="success"
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: user.isActive ? 'success.main' : 'text.secondary',
                        }}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(user.lastLogin)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <Tooltip title="Edit User">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(user)}
                          sx={{ color: 'primary.main' }}
                        >
                          <Icon icon="mdi:pencil" style={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={user.id === 1 ? "Can't delete primary admin" : 'Delete User'}>
                        <span>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(user)}
                            disabled={user.id === 1}
                            sx={{ color: 'error.main' }}
                          >
                            <Icon icon="mdi:delete" style={{ fontSize: 18 }} />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{userToDelete?.name}</strong>?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDeleteCancel} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            startIcon={<Icon icon="mdi:delete" />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;
