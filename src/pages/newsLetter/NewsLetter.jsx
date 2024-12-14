import React, { useState } from "react";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
  Box,
  Grid,
  useTheme,
} from "@mui/material";
import { EmailOutlined } from "@mui/icons-material";
import { tokens } from "../../theme";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({
    open: false,
    message: "",
    severity: "success", // success, error
  });

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,6}$/;
    if (emailRegex.test(email)) {
      setMessage({
        open: true,
        message: "Subscribed successfully to the newsletter!",
        severity: "success",
      });
      setEmail(""); // Clear the email input field
    } else {
      setMessage({
        open: true,
        message: "Please enter a valid email address.",
        severity: "error",
      });
    }
  };

  const handleCloseMessage = () => {
    setMessage({ open: false, message: "", severity: "success" });
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#f4f7fa",
        padding: "20px",
        margin: 4,
      }}
    >
      <Box
        sx={{
          // backgroundColor: "#fff",
          padding: "30px 40px",
          borderRadius: "15px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
          maxWidth: 600,
          width: "100%",
        }}
        style={{
          backgroundColor: colors.primary[400],
          color: colors.primary[100],
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          Subscribe to Our Newsletter
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ marginBottom: "40px", color: "#666" }}
        >
          Get the latest updates and news directly in your inbox.
        </Typography>

        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item xs={12} sx={{ width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Your Email"
              value={email}
              onChange={handleInputChange}
              type="email"
              required
              InputProps={{
                startAdornment: (
                  <EmailOutlined
                  // sx={{ color: "#3f51b5" }}
                  />
                ),
              }}
              sx={{
                // backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ddd",
                  },
                  "&:hover fieldset": {
                    borderColor: "#3f51b5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#3f51b5",
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ width: "100%", marginTop: "20px" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                padding: "12px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "10px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#2c387e",
                },
              }}
            >
              Subscribe Now
            </Button>
          </Grid>
        </Grid>

        {/* Message Component */}
        <Snackbar
          open={message.open}
          autoHideDuration={6000}
          onClose={handleCloseMessage}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseMessage}
            severity={message.severity}
            sx={{ width: "100%" }}
          >
            {message.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Newsletter;
