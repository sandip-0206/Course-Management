import React, { useState } from "react";
import {
  CalendarToday,
  Alarm,
  PersonAdd,
  CheckCircle,
} from "@mui/icons-material"; // Material-UI icons
import {
  TextField,
  Button,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";

const ManageTutors = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOpenModal(true); // Show confirmation modal
  };

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Book a Session with Our Tutors
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Select a date, time, and tutor to get started!
        </p>
      </div>

      <div className="flex justify-center">
        {/* Booking Form */}
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
          <form onSubmit={handleFormSubmit}>
            {/* Tutor Name */}
            <div className="mb-4">
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>

            {/* Tutor Email */}
            <div className="mb-4">
              <TextField
                label="Your Email"
                variant="outlined"
                fullWidth
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
                type="email"
              />
            </div>

            {/* Date Picker */}
            {/* <div className="mb-4">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Select Date"
                  inputFormat="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(props) => <TextField {...props} fullWidth />}
                  required
                />
              </LocalizationProvider>
            </div> */}

            {/* Time Picker */}
            {/* <div className="mb-4">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  renderInput={(props) => <TextField {...props} fullWidth />}
                  required
                />
              </LocalizationProvider>
            </div> */}

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<PersonAdd />}
                className="w-full mt-4"
              >
                Book Now
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for booking confirmation */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto mt-24">
          {!bookingConfirmed ? (
            <>
              <Typography
                id="modal-title"
                variant="h6"
                className="text-2xl font-semibold mb-4"
              >
                Confirm Your Booking
              </Typography>
              <Typography
                id="modal-description"
                className="text-lg text-gray-600 mb-4"
              >
                You have selected {studentName},{" "}
                {selectedDate ? selectedDate.toLocaleDateString() : ""} at{" "}
                {selectedTime ? selectedTime.toLocaleTimeString() : ""}.
              </Typography>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleConfirmBooking}
                  variant="contained"
                  color="primary"
                  startIcon={<CheckCircle />}
                >
                  Confirm
                </Button>
                <Button
                  onClick={handleCloseModal}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <Typography variant="h6" className="text-xl font-semibold mb-4">
                Booking Confirmed!
              </Typography>
              <Typography className="text-lg text-green-600">
                Your session with {studentName} is confirmed for{" "}
                {selectedDate.toLocaleDateString()} at{" "}
                {selectedTime.toLocaleTimeString()}.
              </Typography>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ManageTutors;
