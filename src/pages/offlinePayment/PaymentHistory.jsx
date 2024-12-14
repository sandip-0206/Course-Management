import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
} from "@mui/material";

const PaymentHistory = ({ paymentHistory, students }) => {
  const downloadBill = (payment) => {
    const student = students.find((s) => s.id === payment.studentID);
    const billContent = `
      Payment Receipt
      ---------------------
      Student Name: ${student.name}
      Student ID: ${payment.studentID}
      Payment Mode: ${payment.mode}
      Amount: ₹${payment.amount}
      Date: ${payment.date}
    `;

    const blob = new Blob([billContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${student.name}_Bill_${payment.id}.txt`;
    link.click();
  };

  const hasPayments = (paymentHistory?.length ?? 0) > 0;

  return (
    <Box p={3}>
      <Typography variant="h6" mb={2}>
        Payment History
      </Typography>

      {!hasPayments ? (
        <Typography color="textSecondary">No payments recorded yet.</Typography>
      ) : (
        <Paper elevation={3} sx={{ overflow: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>Mode</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentHistory?.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.studentName}</TableCell>
                  <TableCell>{payment.studentID}</TableCell>
                  <TableCell>{payment.mode}</TableCell>
                  <TableCell>₹{payment.amount}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => downloadBill(payment)}
                    >
                      Download Bill
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default PaymentHistory;
