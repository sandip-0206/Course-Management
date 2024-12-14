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
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import { Edit, DeleteOutline, Search } from "@mui/icons-material";
import { tokens } from "../../theme";

export default function TutorManagement() {
  const [tutors, setTutors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isEditingTutor, setIsEditingTutor] = useState(false);
  const [currentTutor, setCurrentTutor] = useState(null);
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  useEffect(() => {
    // Simulate initial tutor data
    setTutors([
      {
        id: 1,
        name: "John Doe",
        subject: "Math",
        availability: "Mon, Wed, Fri",
      },
      {
        id: 2,
        name: "Jane Smith",
        subject: "Science",
        availability: "Tue, Thu",
      },
    ]);
    // Simulate initial booking data
    setBookings([
      {
        id: 1,
        tutorId: 1,
        studentName: "Alice Johnson",
        date: "2024-12-10",
        time: "10:00 AM",
      },
      {
        id: 2,
        tutorId: 2,
        studentName: "Bob Smith",
        date: "2024-12-12",
        time: "2:00 PM",
      },
    ]);
  }, []);

  const handleOpenTutorModal = (tutor = null) => {
    setCurrentTutor(tutor);
    setIsEditingTutor(!!tutor);
    setIsTutorModalOpen(true);
  };

  const handleCloseTutorModal = () => {
    setIsTutorModalOpen(false);
    setCurrentTutor(null);
    setIsEditingTutor(false);
  };

  const handleSaveTutor = (data) => {
    if (isEditingTutor) {
      setTutors(
        tutors.map((t) =>
          t.id === currentTutor.id ? { ...currentTutor, ...data } : t
        )
      );
    } else {
      setTutors([...tutors, { id: Date.now(), ...data }]);
    }
    handleCloseTutorModal();
  };

  const handleDeleteTutor = (id) => {
    if (window.confirm("Are you sure you want to delete this tutor?")) {
      setTutors(tutors.filter((t) => t.id !== id));
      setBookings(bookings.filter((b) => b.tutorId !== id)); // Delete related bookings
    }
  };

  const handleOpenBookingModal = (tutorId, booking = null) => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const handleSaveBooking = (data) => {
    setBookings([...bookings, { id: Date.now(), ...data }]);
    handleCloseBookingModal();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedTutors = tutors.sort((a, b) => {
    const order = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -order;
    if (a[sortConfig.key] > b[sortConfig.key]) return order;
    return 0;
  });

  const filteredTutors = sortedTutors.filter((tutor) =>
    tutor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="p-6">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        mb={6}
        p={2}
        gap={2}
      >
        <h1 className="text-2xl font-bold">Tutor Management</h1>

        <Box display="flex" flexWrap="wrap" gap={2}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Tutors"
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenTutorModal()}
            // mb={6}
          >
            Add Tutor
          </Button>
        </Box>
      </Box>

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
                  active={sortConfig.key === "name"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("name")}
                >
                  Tutor Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "subject"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("subject")}
                >
                  Subject
                </TableSortLabel>
              </TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTutors.map((tutor) => (
              <TableRow key={tutor.id}>
                <TableCell>{tutor.name}</TableCell>
                <TableCell>{tutor.subject}</TableCell>
                <TableCell>{tutor.availability}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenTutorModal(tutor)}
                  >
                    <Edit color="secondary" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteTutor(tutor.id)}
                  >
                    <DeleteOutline color="error" />
                  </IconButton>
                  <Button
                    style={{
                      backgroundColor: colors.greenAccent[600],
                      color: colors.primary[100],
                    }}
                    size="small"
                    onClick={() => handleOpenBookingModal(tutor.id)}
                  >
                    Book Session
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TutorModal
        isOpen={isTutorModalOpen}
        onClose={handleCloseTutorModal}
        onSave={handleSaveTutor}
        isEditing={isEditingTutor}
        currentTutor={currentTutor}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onSave={handleSaveBooking}
      />
    </div>
  );
}

function TutorModal({ isOpen, onClose, onSave, isEditing, currentTutor }) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    availability: "",
  });

  useEffect(() => {
    if (isEditing && currentTutor) {
      setFormData(currentTutor);
    } else {
      setFormData({ name: "", subject: "", availability: "" });
    }
  }, [isEditing, currentTutor]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? "Edit Tutor" : "Add Tutor"}</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Tutor Name"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          label="Subject"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          label="Availability"
          fullWidth
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function BookingModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    studentName: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Booking</DialogTitle>
      <DialogContent>
        <TextField
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          label="Student Name"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="time"
          value={formData.time}
          onChange={handleChange}
          label="Time"
          fullWidth
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
