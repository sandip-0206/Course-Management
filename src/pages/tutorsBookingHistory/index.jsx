import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

const BookingHistory = () => {
  const bookings = [
    {
      tutorName: "John Doe",
      subject: "Math",
      date: "2024-12-01",
      time: "10:00 AM",
      status: "Completed",
    },
    {
      tutorName: "Jane Smith",
      subject: "English",
      date: "2024-12-02",
      time: "2:00 PM",
      status: "Upcoming",
    },
    {
      tutorName: "Emily Johnson",
      subject: "Science",
      date: "2024-11-25",
      time: "4:00 PM",
      status: "Cancelled",
    },
  ];

  return (
    <div className="p-4">
      <Typography variant="h5" className="mb-4 font-bold">
        Booking History
      </Typography>
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold">Tutor</TableCell>
              <TableCell className="font-semibold">Subject</TableCell>
              <TableCell className="font-semibold">Date</TableCell>
              <TableCell className="font-semibold">Time</TableCell>
              <TableCell className="font-semibold">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow key={index}>
                <TableCell>{booking.tutorName}</TableCell>
                <TableCell>{booking.subject}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    color={
                      booking.status === "Completed"
                        ? "success"
                        : booking.status === "Cancelled"
                        ? "error"
                        : "warning"
                    }
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookingHistory;
