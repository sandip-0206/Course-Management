import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  useTheme,
} from "@mui/material";
import { PhoneAndroid, Payments } from "@mui/icons-material";
import { tokens } from "../../theme";

const MobilePayment = ({ students }) => {
  const [studentID, setStudentID] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!phoneNumber || !amount || amount <= 0) {
      alert("Please enter valid mobile payment details.");
      return;
    }

    setIsLoading(true);

    try {
      setTimeout(() => {
        alert(`Mobile payment of ₹${amount} recorded successfully!`);
        setPhoneNumber("");
        setAmount("");
        setIsLoading(false);
      }, 1000);
    } catch {
      alert("Error processing payment.");
      setIsLoading(false);
    }
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        // backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
          // color: "purple",
          // fontWeight: "bolder",
        }}
      >
        <PhoneAndroid /> Mobile Payment
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
            label="Phone Number"
            variant="outlined"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Payments
                  //  sx={{ color: "purple" }}
                  />
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
            variant="contained"
            onClick={handlePayment}
            disabled={isLoading || !phoneNumber || !amount}
            sx={{
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            style={{
              backgroundColor: colors.greenAccent[600],
              color: colors.primary[100],
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Confirm Payment"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MobilePayment;
