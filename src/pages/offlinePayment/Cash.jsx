import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  CircularProgress,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Payments } from "@mui/icons-material";
import { tokens } from "../../theme";

const CashPayment = ({ students, onPayment }) => {
  const [amount, setAmount] = useState("");
  const [studentID, setStudentID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering

  const handlePayment = () => {
    if (!amount || amount <= 0 || !studentID) {
      alert("Please enter valid details.");
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      const student = students.find((s) => s.id === studentID);
      const payment = {
        id: Date.now(),
        studentID,
        studentName: student.name,
        amount,
        mode: "Cash",
        date: new Date().toLocaleString(),
      };

      onPayment(payment); // Pass payment data to parent

      setAmount("");
      setStudentID("");
      setIsLoading(false);
    }, 1000);
  };

  // Filter students based on the search query for both name and ID
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toString().includes(searchQuery)
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box p={3}>
      <Typography variant="h6" color="green" mb={2}>
        Cash Payment
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            select
            fullWidth
            label="Select Student"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            onInput={(e) => setSearchQuery(e.target.value)} // Update search query as user types
            variant="outlined"
            placeholder="Search by Name or ID"
          >
            {filteredStudents.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name} ({student.id})
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Enter Amount"
            variant="outlined"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Payments />
                </InputAdornment>
              ),
            }}
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
            // fullWidth
            variant="contained"
            // color="success"
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

export default CashPayment;
