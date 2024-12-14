import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { tokens } from "../../theme";

export default function TutorBookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching booking history for the user
    setBookings([
      {
        id: 1,
        tutorName: "Jane Doe",
        date: "2024-12-10",
        time: "10:00 AM",
        status: "Upcoming",
      },
      {
        id: 2,
        tutorName: "John Smith",
        date: "2024-12-12",
        time: "2:00 PM",
        status: "Completed",
      },
      {
        id: 3,
        tutorName: "Alice Johnson",
        date: "2024-12-15",
        time: "1:00 PM",
        status: "Upcoming",
      },
    ]);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedBookings = bookings.sort((a, b) => {
    const order = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -order;
    if (a[sortConfig.key] > b[sortConfig.key]) return order;
    return 0;
  });

  const filteredBookings = sortedBookings.filter(
    (booking) =>
      booking.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.date.includes(searchQuery)
  );

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="p-6 flex flex-wrap items-center justify-between">
      <h1 className="text-2xl font-bold mb-6">My Tutor Booking History</h1>

      <div className=" flex flex-wrap mb-6">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by Tutor or Date"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <TableContainer
        component={Paper}
        style={{
          backgroundColor: colors.primary[400],
          color: colors.primary[100],
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "tutorName"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("tutorName")}
                >
                  Tutor Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "date"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Time</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "status"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.tutorName}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <Button
                    style={{
                      backgroundColor: colors.greenAccent[600],
                      color: colors.primary[100],
                    }}
                    size="small"
                    onClick={() => handleOpenModal(booking)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedBooking && (
        <BookingDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          booking={selectedBooking}
        />
      )}
    </div>
  );
}

function BookingDetailsModal({ isOpen, onClose, booking }) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Booking Details</DialogTitle>
      <DialogContent>
        <div className="space-y-4">
          <div>
            <strong>Tutor Name:</strong> {booking.tutorName}
          </div>
          <div>
            <strong>Date:</strong> {booking.date}
          </div>
          <div>
            <strong>Time:</strong> {booking.time}
          </div>
          <div>
            <strong>Status:</strong> {booking.status}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
