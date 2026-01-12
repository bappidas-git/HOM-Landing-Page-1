/**
 * LeadDetail Component
 * Comprehensive lead details with timeline, notes, and management actions
 */

import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Button,
  IconButton,
  Avatar,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Skeleton,
  alpha,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarMonth as CalendarIcon,
  DirectionsCar as CarIcon,
  Restaurant as RestaurantIcon,
  Computer as ComputerIcon,
  Notes as NotesIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckIcon,
  History as HistoryIcon,
  OpenInNew as OpenInNewIcon,
  ContentCopy as CopyIcon,
  WhatsApp as WhatsAppIcon,
  Campaign as CampaignIcon,
  Fingerprint as FingerprintIcon,
  DevicesOther as DeviceIcon,
  Flag as FlagIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { LEAD_STATUS_OPTIONS, LEAD_PRIORITY_OPTIONS } from "@/lib/constants";

// Utility to format dates
const formatDate = (dateString, type = "full") => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";

    if (type === "date") {
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } else if (type === "time") {
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (type === "relative") {
      const now = new Date();
      const diff = now - date;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (days === 0) return "Today";
      if (days === 1) return "Yesterday";
      if (days < 7) return days + " days ago";
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });
    }
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "-";
  }
};

// Get status config
const getStatusConfig = (status) => {
  return (
    LEAD_STATUS_OPTIONS.find((s) => s.value === status) || {
      value: status,
      label: status,
      color: "#9e9e9e",
    }
  );
};

// Get priority config
const getPriorityConfig = (priority) => {
  return (
    LEAD_PRIORITY_OPTIONS.find((p) => p.value === priority) || {
      value: priority,
      label: priority,
      color: "#9e9e9e",
    }
  );
};

/**
 * InfoCard Component - Displays a labeled value
 */
const InfoCard = ({ icon: Icon, label, value, action, copyable }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (value && copyable) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, py: 1.5 }}>
      <Box
        sx={{
          p: 1,
          borderRadius: 2,
          backgroundColor: alpha("#667eea", 0.1),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon sx={{ color: "#667eea", fontSize: 20 }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            color: "text.primary",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value || "-"}
        </Typography>
      </Box>
      {copyable && value && (
        <Tooltip title={copied ? "Copied!" : "Copy"}>
          <IconButton size="small" onClick={handleCopy}>
            <CopyIcon
              fontSize="small"
              sx={{ color: copied ? "#4caf50" : "action" }}
            />
          </IconButton>
        </Tooltip>
      )}
      {action}
    </Box>
  );
};

/**
 * Main LeadDetail Component
 */
const LeadDetail = ({
  lead,
  loading = false,
  onBack,
  onSave,
  onStatusChange,
  onPriorityChange,
  onAddNote,
  onScheduleFollowUp,
  onDelete,
}) => {
  const [status, setStatus] = useState(lead?.status || "new");
  const [priority, setPriority] = useState(lead?.priority || "medium");
  const [newNote, setNewNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showFollowUpDialog, setShowFollowUpDialog] = useState(false);
  const [followUpDate, setFollowUpDate] = useState("");

  const statusConfig = getStatusConfig(lead?.status);
  const priorityConfig = getPriorityConfig(lead?.priority);

  // Handle status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onStatusChange?.(lead.id, newStatus);
  };

  // Handle priority change
  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    setPriority(newPriority);
    onPriorityChange?.(lead.id, newPriority);
  };

  // Handle add note
  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote?.(lead.id, newNote);
      setNewNote("");
    }
  };

  // Handle schedule follow-up
  const handleScheduleFollowUp = () => {
    if (followUpDate) {
      onScheduleFollowUp?.(lead.id, followUpDate);
      setShowFollowUpDialog(false);
      setFollowUpDate("");
    }
  };

  if (loading) {
    return (
      <Box>
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{ borderRadius: 3, mb: 3 }}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Skeleton
              variant="rectangular"
              height={400}
              sx={{ borderRadius: 3 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ borderRadius: 3 }}
            />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!lead) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5" color="text.secondary">
          Lead not found
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
          <IconButton onClick={onBack} sx={{ color: "#fff", mt: -0.5 }}>
            <ArrowBackIcon />
          </IconButton>

          <Avatar
            sx={{
              width: 72,
              height: 72,
              fontSize: "1.5rem",
              fontWeight: 700,
              backgroundColor: alpha("#287f84", 0.9),
            }}
          >
            {lead.name?.charAt(0)?.toUpperCase() || "?"}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#ffffff !important;" }}
              >
                {lead.name}
              </Typography>
              <Chip
                label={statusConfig.label}
                size="small"
                sx={{
                  backgroundColor: statusConfig.color,
                  color: "#fff !important;",
                  fontWeight: 600,
                }}
              />
              <Chip
                icon={
                  <FlagIcon
                    sx={{ color: "inherit !important", fontSize: 16 }}
                  />
                }
                label={priorityConfig.label}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: priorityConfig.color,
                  backgroundColor: priorityConfig.color,
                  color: priorityConfig.color,
                  fontWeight: 500,
                  color: "#fff !important;",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{ opacity: 0.8, mb: 2, color: "#ffffff !important;" }}
            >
              Lead ID: #{lead.id} | Created{" "}
              {formatDate(lead.createdAt, "relative")}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                size="small"
                startIcon={<PhoneIcon />}
                onClick={() => (window.location.href = "tel:" + lead.mobile)}
                sx={{
                  backgroundColor: "#4caf50",
                  "&:hover": { backgroundColor: "#388e3c" },
                }}
              >
                Call
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<WhatsAppIcon />}
                onClick={() =>
                  window.open("https://wa.me/91" + lead.mobile, "_blank")
                }
                sx={{
                  backgroundColor: "#25D366",
                  "&:hover": { backgroundColor: "#1da851" },
                }}
              >
                WhatsApp
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<EmailIcon />}
                onClick={() => (window.location.href = "mailto:" + lead.email)}
                sx={{
                  backgroundColor: "#2196f3",
                  "&:hover": { backgroundColor: "#1976d2" },
                }}
              >
                Email
              </Button>
            </Stack>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          {/* Contact Information */}
          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Contact Information
                </Typography>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <InfoCard
                    icon={PersonIcon}
                    label="Full Name"
                    value={lead.name}
                  />
                  <InfoCard
                    icon={PhoneIcon}
                    label="Mobile"
                    value={lead.mobile}
                    copyable
                  />
                  <InfoCard
                    icon={EmailIcon}
                    label="Email"
                    value={lead.email}
                    copyable
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoCard
                    icon={LocationIcon}
                    label="Location"
                    value={
                      [
                        lead.location?.city || lead.city,
                        lead.location?.state || lead.state,
                      ]
                        .filter(Boolean)
                        .join(", ") || "-"
                    }
                  />
                  <InfoCard
                    icon={CampaignIcon}
                    label="Source"
                    value={lead.source?.replace("_", " ").toUpperCase()}
                  />
                  <InfoCard
                    icon={CalendarIcon}
                    label="Created At"
                    value={formatDate(lead.createdAt, "full")}
                  />
                </Grid>
              </Grid>

              {lead.message && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: alpha("#667eea", 0.05),
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontWeight: 500 }}
                  >
                    Message
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {lead.message}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Site Visit Details */}
          {lead.wantsSiteVisit && (
            <Card
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
            >
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Site Visit Details
                    </Typography>
                    <Chip label="Requested" size="small" color="success" />
                  </Box>
                }
              />
              <CardContent sx={{ pt: 0 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <InfoCard
                      icon={CalendarIcon}
                      label="Date & Time"
                      value={
                        lead.siteVisitDate
                          ? formatDate(lead.siteVisitDate, "date") +
                            " at " +
                            (lead.siteVisitTime || "TBD")
                          : "Not scheduled"
                      }
                    />
                  </Grid>
                  {lead.wantsPickupDrop && (
                    <Grid item xs={12} sm={6}>
                      <InfoCard
                        icon={CarIcon}
                        label="Pickup Location"
                        value={lead.pickupLocation}
                      />
                    </Grid>
                  )}
                  {lead.wantsMeal && (
                    <Grid item xs={12} sm={6}>
                      <InfoCard
                        icon={RestaurantIcon}
                        label="Meal Preference"
                        value={
                          lead.mealPreference?.charAt(0).toUpperCase() +
                          lead.mealPreference?.slice(1)
                        }
                      />
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Notes */}
          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Notes & Activity
                </Typography>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              {/* Add Note */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Add a note about this lead..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  sx={{
                    backgroundColor: "#667eea",
                    "&:hover": { backgroundColor: "#764ba2" },
                  }}
                >
                  Add Note
                </Button>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Notes List */}
              {lead.notes && lead.notes.length > 0 ? (
                <List sx={{ py: 0 }}>
                  {lead.notes.map((note, index) => (
                    <ListItem
                      key={note.id || index}
                      sx={{ px: 0, alignItems: "flex-start" }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            fontSize: "0.875rem",
                            backgroundColor: alpha("#1a1a2e", 0.1),
                            color: "#1a1a2e",
                          }}
                        >
                          {note.createdBy?.charAt(0)?.toUpperCase() || "A"}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              {note.createdBy || "Admin"}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {formatDate(note.createdAt, "relative")}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                          >
                            {note.text}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center", py: 3 }}
                >
                  No notes yet. Add one above.
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Tracking Information */}
          <Card
            sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
          >
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Tracking Information
                </Typography>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <InfoCard
                    icon={FingerprintIcon}
                    label="IP Address"
                    value={lead.ipAddress}
                    copyable
                  />
                  <InfoCard
                    icon={DeviceIcon}
                    label="User Agent"
                    value={lead.userAgent?.substring(0, 50) + "..."}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoCard
                    icon={CampaignIcon}
                    label="UTM Source"
                    value={lead.utmSource || lead.utm_source || "-"}
                  />
                  <InfoCard
                    icon={CampaignIcon}
                    label="UTM Campaign"
                    value={lead.utmCampaign || lead.utm_campaign || "-"}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={4}>
          {/* Status & Priority */}
          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Status & Priority
                </Typography>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  {LEAD_STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor: option.color,
                          }}
                        />
                        {option.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priority}
                  label="Priority"
                  onChange={handlePriorityChange}
                >
                  {LEAD_PRIORITY_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <FlagIcon sx={{ color: option.color, fontSize: 18 }} />
                        {option.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => onSave?.(lead.id, { status, priority })}
                sx={{
                  backgroundColor: "#667eea",
                  "&:hover": { backgroundColor: "#764ba2" },
                }}
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Quick Actions
                </Typography>
              }
            />
            <CardContent sx={{ pt: 0 }}>
              <Stack spacing={1.5}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ScheduleIcon />}
                  onClick={() => setShowFollowUpDialog(true)}
                >
                  Schedule Follow-up
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<CalendarIcon />}
                  disabled={!lead.wantsSiteVisit}
                >
                  Update Site Visit
                </Button>
                <Divider />
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete?.(lead.id)}
                >
                  Delete Lead
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Follow-up */}
          {lead.followUpDate && (
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                backgroundColor: alpha("#ff9800", 0.05),
                borderColor: alpha("#ff9800", 0.3),
              }}
            >
              <CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <ScheduleIcon sx={{ color: "#ff9800" }} />
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: "#ff9800" }}
                  >
                    Follow-up Scheduled
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(lead.followUpDate, "full")}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Follow-up Dialog */}
      <Dialog
        open={showFollowUpDialog}
        onClose={() => setShowFollowUpDialog(false)}
      >
        <DialogTitle>Schedule Follow-up</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <TextField
            type="datetime-local"
            fullWidth
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowFollowUpDialog(false)}>Cancel</Button>
          <Button
            onClick={handleScheduleFollowUp}
            variant="contained"
            sx={{
              backgroundColor: "#667eea",
              "&:hover": { backgroundColor: "#764ba2" },
            }}
          >
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeadDetail;
