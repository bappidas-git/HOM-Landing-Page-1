/**
 * AuditLog Component
 * Reusable audit log display component for admin panel
 */

import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Skeleton,
  Grid,
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  History as HistoryIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
  Upload as UploadIcon,
  OpenInNew as OpenInNewIcon,
  Close as CloseIcon,
  ContentCopy as ContentCopyIcon,
  Person as PersonIcon,
  People as PeopleIcon,
  Search as SearchIcon,
  Analytics as AnalyticsIcon,
  Code as CodeIcon,
  VpnKey as VpnKeyIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styles from './AuditLog.module.css';

/**
 * Get action icon based on action type
 */
const getActionIcon = (action) => {
  const icons = {
    LOGIN: <LoginIcon fontSize="small" />,
    LOGOUT: <LogoutIcon fontSize="small" />,
    CREATE: <AddIcon fontSize="small" />,
    UPDATE: <EditIcon fontSize="small" />,
    DELETE: <DeleteIcon fontSize="small" />,
    VIEW: <VisibilityIcon fontSize="small" />,
    EXPORT: <GetAppIcon fontSize="small" />,
    IMPORT: <UploadIcon fontSize="small" />,
  };
  return icons[action] || <HistoryIcon fontSize="small" />;
};

/**
 * Get action color based on action type
 */
const getActionColor = (action) => {
  const colors = {
    LOGIN: 'info',
    LOGOUT: 'default',
    CREATE: 'success',
    UPDATE: 'warning',
    DELETE: 'error',
    VIEW: 'default',
    EXPORT: 'info',
    IMPORT: 'info',
  };
  return colors[action] || 'default';
};

/**
 * Get module color based on module type
 */
const getModuleColor = (module) => {
  const colors = {
    LEAD: '#2196f3',
    SEO: '#9c27b0',
    PIXEL: '#ff9800',
    SCHEMA: '#00bcd4',
    KEYWORD: '#4caf50',
    SETTINGS: '#667eea',
    AUTH: '#1a1a2e',
  };
  return colors[module] || '#9e9e9e';
};

/**
 * Get module icon based on module type
 */
const getModuleIcon = (module) => {
  const icons = {
    LEAD: <PeopleIcon fontSize="small" />,
    SEO: <SearchIcon fontSize="small" />,
    PIXEL: <AnalyticsIcon fontSize="small" />,
    SCHEMA: <CodeIcon fontSize="small" />,
    KEYWORD: <VpnKeyIcon fontSize="small" />,
    SETTINGS: <SettingsIcon fontSize="small" />,
    AUTH: <PersonIcon fontSize="small" />,
  };
  return icons[module] || <HistoryIcon fontSize="small" />;
};

/**
 * Timeline Item Component
 */
export const AuditLogTimelineItem = ({ log, isLast, onViewDetails }) => {
  const color = {
    LOGIN: '#2196f3',
    LOGOUT: '#9e9e9e',
    CREATE: '#4caf50',
    UPDATE: '#ff9800',
    DELETE: '#f44336',
    VIEW: '#00bcd4',
    EXPORT: '#9c27b0',
  }[log.action] || '#9e9e9e';

  return (
    <Box className={styles.timelineItem}>
      <Box className={styles.timelineConnector}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            backgroundColor: `${color}15`,
            color: color,
          }}
        >
          {getActionIcon(log.action)}
        </Avatar>
        {!isLast && <Box className={styles.timelineLine} />}
      </Box>

      <Box className={styles.timelineContent}>
        <Box className={styles.timelineHeader}>
          <Typography variant="subtitle2" fontWeight={600}>
            {log.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(log.timestamp).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </Typography>
        </Box>
        <Box className={styles.timelineMeta}>
          <Chip
            label={log.action}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              backgroundColor: `${color}15`,
              color: color,
            }}
          />
          <Typography variant="caption" color="text.secondary">
            by {log.user}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            from {log.ipAddress}
          </Typography>
          {onViewDetails && (
            <IconButton size="small" onClick={() => onViewDetails(log)}>
              <OpenInNewIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

/**
 * Audit Log Table Row Component
 */
export const AuditLogTableRow = ({ log, expanded, onToggle, onViewDetails, onCopyIP }) => (
  <>
    <TableRow
      hover
      className={styles.tableRow}
      sx={{
        '&:hover': { backgroundColor: 'rgba(139, 154, 70, 0.04)' },
        cursor: log.metadata ? 'pointer' : 'default',
      }}
    >
      <TableCell>
        {log.metadata && (
          <IconButton size="small" onClick={() => onToggle(log.id)}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {new Date(log.timestamp).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              fontSize: '0.75rem',
              backgroundColor: '#667eea',
            }}
          >
            {log.user.charAt(0)}
          </Avatar>
          <Typography variant="body2" fontWeight={500}>
            {log.user}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          label={log.action}
          size="small"
          color={getActionColor(log.action)}
          variant="outlined"
          sx={{ fontWeight: 500 }}
        />
      </TableCell>
      <TableCell>
        <Chip
          icon={getModuleIcon(log.module)}
          label={log.module}
          size="small"
          sx={{
            backgroundColor: `${getModuleColor(log.module)}15`,
            color: getModuleColor(log.module),
            '& .MuiChip-icon': {
              color: getModuleColor(log.module),
            },
          }}
        />
      </TableCell>
      <TableCell>
        <Typography
          variant="body2"
          sx={{
            maxWidth: 300,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {log.description}
        </Typography>
      </TableCell>
      <TableCell>
        <Tooltip title="Copy IP">
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: 'monospace',
              cursor: 'pointer',
              '&:hover': { color: '#667eea' },
            }}
            onClick={() => onCopyIP(log.ipAddress)}
          >
            {log.ipAddress}
          </Typography>
        </Tooltip>
      </TableCell>
      <TableCell>
        <IconButton size="small" onClick={() => onViewDetails(log)}>
          <OpenInNewIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>

    {/* Expanded metadata row */}
    {log.metadata && (
      <TableRow>
        <TableCell
          colSpan={8}
          sx={{
            py: 0,
            backgroundColor: 'rgba(139, 154, 70, 0.03)',
          }}
        >
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2, px: 4 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{ color: '#667eea' }}
              >
                Metadata
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(log.metadata).map(([key, value]) => (
                  <Grid item xs={12} sm={6} md={3} key={key}>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {String(value)}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    )}
  </>
);

/**
 * Audit Log Details Dialog Component
 */
export const AuditLogDetailsDialog = ({ open, log, onClose, onCopyIP }) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="sm"
    fullWidth
    PaperProps={{
      sx: { borderRadius: 3 },
    }}
  >
    <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <HistoryIcon sx={{ color: '#667eea' }} />
        <Typography variant="h6">Audit Log Details</Typography>
      </Box>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      {log && (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Timestamp
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {new Date(log.timestamp).toLocaleString('en-IN')}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              User
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {log.user}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Action
            </Typography>
            <Box>
              <Chip
                label={log.action}
                size="small"
                color={getActionColor(log.action)}
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              Module
            </Typography>
            <Box>
              <Chip
                icon={getModuleIcon(log.module)}
                label={log.module}
                size="small"
                sx={{
                  backgroundColor: `${getModuleColor(log.module)}15`,
                  color: getModuleColor(log.module),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="text.secondary">
              Description
            </Typography>
            <Typography variant="body2">{log.description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary">
              IP Address
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" fontFamily="monospace">
                {log.ipAddress}
              </Typography>
              {onCopyIP && (
                <IconButton size="small" onClick={() => onCopyIP(log.ipAddress)}>
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Grid>
          {log.userAgent && (
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                User Agent
              </Typography>
              <Typography
                variant="body2"
                sx={{ wordBreak: 'break-all', fontSize: '0.75rem' }}
              >
                {log.userAgent}
              </Typography>
            </Grid>
          )}
          {log.metadata && (
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" gutterBottom sx={{ color: '#667eea' }}>
                Metadata
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  backgroundColor: 'rgba(139, 154, 70, 0.03)',
                  borderRadius: 2,
                }}
              >
                <Grid container spacing={1}>
                  {Object.entries(log.metadata).map(([key, value]) => (
                    <Grid item xs={6} key={key}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {String(value)}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </DialogContent>
    <DialogActions sx={{ p: 2 }}>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

/**
 * Main AuditLog Component
 * Renders a table or timeline of audit logs
 */
const AuditLog = ({
  logs = [],
  loading = false,
  viewMode = 'table',
  showPagination = true,
  rowsPerPage = 10,
  onViewDetails,
  onCopyIP,
  emptyMessage = 'No audit logs found',
}) => {
  const [page, setPage] = useState(0);
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedLog, setSelectedLog] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const toggleRowExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleViewDetails = (log) => {
    if (onViewDetails) {
      onViewDetails(log);
    } else {
      setSelectedLog(log);
      setDetailsOpen(true);
    }
  };

  const handleCopyIP = (ip) => {
    if (onCopyIP) {
      onCopyIP(ip);
    } else {
      navigator.clipboard.writeText(ip);
    }
  };

  const paginatedLogs = showPagination
    ? logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : logs;

  if (loading) {
    return (
      <Paper className={styles.container}>
        {viewMode === 'table' ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f7' }}>
                  <TableCell sx={{ width: 50 }} />
                  <TableCell>Timestamp</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Module</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell sx={{ width: 80 }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width={30} />
                    </TableCell>
                    {[...Array(7)].map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ p: 3 }}>
            {[...Array(5)].map((_, index) => (
              <Box key={index} sx={{ display: 'flex', mb: 3 }}>
                <Skeleton variant="circular" width={36} height={36} sx={{ mr: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Paper>
    );
  }

  if (logs.length === 0) {
    return (
      <Paper className={styles.container}>
        <Box className={styles.emptyState}>
          <HistoryIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {emptyMessage}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <Paper
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={styles.container}
      >
        {viewMode === 'table' ? (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f7' }}>
                    <TableCell sx={{ width: 50 }} />
                    <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Module</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>IP Address</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 80 }}>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedLogs.map((log) => (
                    <AuditLogTableRow
                      key={log.id}
                      log={log}
                      expanded={expandedRows[log.id]}
                      onToggle={toggleRowExpand}
                      onViewDetails={handleViewDetails}
                      onCopyIP={handleCopyIP}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {showPagination && (
              <TablePagination
                component="div"
                count={logs.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[rowsPerPage]}
              />
            )}
          </>
        ) : (
          <Box sx={{ p: 3 }}>
            {paginatedLogs.map((log, index) => (
              <AuditLogTimelineItem
                key={log.id}
                log={log}
                isLast={index === paginatedLogs.length - 1}
                onViewDetails={handleViewDetails}
              />
            ))}
            {showPagination && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <TablePagination
                  component="div"
                  count={logs.length}
                  page={page}
                  onPageChange={(e, newPage) => setPage(newPage)}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[rowsPerPage]}
                />
              </Box>
            )}
          </Box>
        )}
      </Paper>

      {/* Details Dialog (internal) */}
      <AuditLogDetailsDialog
        open={detailsOpen}
        log={selectedLog}
        onClose={() => setDetailsOpen(false)}
        onCopyIP={handleCopyIP}
      />
    </>
  );
};

export default AuditLog;
