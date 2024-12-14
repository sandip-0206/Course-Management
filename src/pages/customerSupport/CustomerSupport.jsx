import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
  Paper,
  CircularProgress,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  Send,
  HelpOutline,
  Feedback,
  ReportProblem,
} from "@mui/icons-material";
import { teal, indigo } from "@mui/material/colors";
import { tokens } from "../../theme";

const CustomerSupport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [issueCategory, setIssueCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "message") setMessage(value);
    if (name === "issueCategory") setIssueCategory(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate an API request to submit the support request
    setTimeout(() => {
      setLoading(false);
      setSnackbarMessage(
        "Your support request has been submitted successfully!"
      );
      setSnackbarOpen(true);
      setName("");
      setEmail("");
      setMessage("");
      setIssueCategory("");
    }, 2000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        margin: 4,
        padding: 4,
        borderRadius: "10px",
        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
        },
      }}
      style={{
        backgroundColor: colors.primary[400],
        color: colors.primary[100],
      }}
    >
      <Typography
        variant="h4"
        // align="center"
        sx={{ fontWeight: "bold", color: teal[600], mb: 4 }}
      >
        Customer Support
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              required
              name="name"
              value={name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <IconButton sx={{ color: teal[600] }}>
                    <HelpOutline />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Your Email"
              variant="outlined"
              fullWidth
              required
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <IconButton sx={{ color: teal[600] }}>
                    <Feedback />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Your Message"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={4}
              name="message"
              value={message}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <IconButton sx={{ color: teal[600] }}>
                    <ReportProblem />
                  </IconButton>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Issue Category</InputLabel>
              <Select
                label="Issue Category"
                name="issueCategory"
                value={issueCategory}
                multiple
                onChange={handleChange}
                sx={{
                  borderColor: teal[300],
                  "&:hover": {
                    borderColor: teal[600],
                  },
                }}
              >
                <MenuItem value="technical">Technical Issue</MenuItem>
                <MenuItem value="billing">Billing Issue</MenuItem>
                <MenuItem value="general">General Inquiry</MenuItem>
                <MenuItem value="feedback">Feedback</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} align="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              // fullWidth
              endIcon={
                loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <Send />
                )
              }
              disabled={loading}
              sx={{
                backgroundColor: teal[600],
                "&:hover": {
                  backgroundColor: teal[700],
                },
              }}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerSupport;
