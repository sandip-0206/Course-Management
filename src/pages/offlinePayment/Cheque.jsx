import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";

const ChequePayment = ({ students, onPayment }) => {
  const [amount, setAmount] = useState("");
  const [studentID, setStudentID] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    if (!amount || amount <= 0 || !studentID || !chequeNumber) {
      alert("Please enter valid details.");
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      const student = students.find((s) => s.id === studentID);
      onPayment({
        id: Date.now(),
        studentID,
        studentName: student.name,
        amount,
        chequeNumber,
        mode: "Cheque",
        date: new Date().toLocaleString(),
      });
      alert(`Cheque payment of ₹${amount} recorded for ${student.name}.`);
      setAmount("");
      setStudentID("");
      setChequeNumber("");
      setIsLoading(false);
    }, 1000);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box p={3}>
      <Typography variant="h6" color="blue" mb={2}>
        Cheque Payment
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Select Student"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
          >
            {students.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name} ({student.id})
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Enter Cheque Number"
            variant="outlined"
            value={chequeNumber}
            onChange={(e) => setChequeNumber(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Enter Amount"
            variant="outlined"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={handlePayment}
            disabled={isLoading}
            style={{
              backgroundColor: colors.greenAccent[600],
              color: colors.primary[100],
            }}
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Confirm Payment"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChequePayment;
