import React, { useState } from "react";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Divider,
  Paper,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material";
import CashPayment from "./Cash";
import ChequePayment from "./Cheque";
import MobilePayment from "./MobilePayment";
import PaymentHistory from "./PaymentHistory";
import { tokens } from "../../theme";

const PaymentSystem = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [students, setStudents] = useState([
    { id: "STU001", name: "John Doe" },
    { id: "STU002", name: "Jane Doe" },
    { id: "STU003", name: "Alice Johnson" },
  ]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handlePayment = (payment) => {
    setPaymentHistory((prev) => [...prev, payment]);
    setSnackbarMessage(
      `Payment of ₹${payment.amount} recorded for ${payment.studentName}`
    );
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Student Payment System
      </Typography>

      <Paper
        elevation={3}
        sx={{ borderRadius: 2, overflow: "hidden" }}
        style={{
          backgroundColor: colors.primary[400],
          color: colors.primary[100],
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={(e, newValue) => setTabIndex(newValue)}
          indicatorColor="primary"
          // textColor="primary"
          style={{
            backgroundColor: colors.greenAccent[400],
            color: colors.primary[100],
          }}
          variant="fullWidth"
        >
          <Tab label="Cash Payment" />
          <Tab label="Cheque Payment" />
          <Tab label="Mobile Payment" />
          <Tab label="Payment History" />
        </Tabs>

        <Divider />

        {tabIndex === 0 && (
          <CashPayment students={students} onPayment={handlePayment} />
        )}
        {tabIndex === 1 && (
          <ChequePayment students={students} onPayment={handlePayment} />
        )}
        {tabIndex === 2 && (
          <MobilePayment students={students} onPayment={handlePayment} />
        )}
        {tabIndex === 3 && (
          <PaymentHistory students={students} paymentHistory={paymentHistory} />
        )}
      </Paper>

      {/* Snackbar for Toast Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentSystem;
