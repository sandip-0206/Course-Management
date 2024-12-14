import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
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
  useTheme,
  IconButton,
} from "@mui/material";
import {
  Search,
  Download,
  Visibility,
  FileDownload,
} from "@mui/icons-material";
import Message from "../message/Message";
import { tokens } from "../../theme";
// import Message from "./Message";  // Import the Message component

export default function StudentProgressReports() {
  const theme = useTheme();
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [message, setMessage] = useState({
    open: false,
    message: "",
    severity: "success", // success, error, info, warning
  });

  useEffect(() => {
    // Simulated fetching of student progress data
    setStudents([
      {
        id: 1,
        name: "John Doe",
        course: "React Bootcamp",
        sessionsAttended: 10,
        averageScore: 85,
        lastSession: "2024-12-01",
      },
      {
        id: 2,
        name: "Jane Smith",
        course: "Node.js Bootcamp",
        sessionsAttended: 8,
        averageScore: 92,
        lastSession: "2024-11-28",
      },
      {
        id: 3,
        name: "Alice Johnson",
        course: "Python Bootcamp",
        sessionsAttended: 12,
        averageScore: 78,
        lastSession: "2024-12-02",
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

  const sortedStudents = students.sort((a, b) => {
    const order = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -order;
    if (a[sortConfig.key] > b[sortConfig.key]) return order;
    return 0;
  });

  const filteredStudents = sortedStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const downloadReport = (student) => {
    const reportData = `
      Student Name: ${student.name}
      Course: ${student.course}
      Sessions Attended: ${student.sessionsAttended}
      Average Score: ${student.averageScore}%
      Last Session: ${student.lastSession}
    `;
    const blob = new Blob([reportData], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${student.name}_Progress_Report.txt`;
    link.click();

    // Display success message after downloading
    setMessage({
      open: true,
      message: `Report for ${student.name} has been downloaded successfully!`,
      severity: "success",
    });
  };

  const generateReport = () => {
    // You can implement the actual report generation logic here.
    setMessage({
      open: true,
      message: "Report generation functionality is under development!",
      severity: "info",
    });
  };

  const handleCloseMessage = () => {
    setMessage({ open: false, message: "", severity: "success" });
  };

  const colors = tokens(theme.palette.mode);

  return (
    <div className="p-6 flex flex-wrap justify-between gap-2">
      <h1 className="text-2xl font-bold text-center text-indigo-600">
        Student Progress Reports
      </h1>

      <div className="flex justify-between items-center gap-2">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by Name or Course"
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          // sx={{
          //   borderRadius: "50px",
          //   boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
          // }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={generateReport}
          startIcon={<Download />}
          sx={{
            padding: "10px 20px",
            borderRadius: "30px",
            boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
          }}
          style={{
            backgroundColor: colors.greenAccent[600],
            color: colors.primary[100],
          }}
        >
          Generate Report
        </Button>
      </div>

      <TableContainer
        component={Paper}
        className="shadow-lg rounded-lg"
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
                  Student Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "course"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("course")}
                >
                  Course
                </TableSortLabel>
              </TableCell>
              <TableCell>Sessions Attended</TableCell>
              <TableCell>Average Score</TableCell>
              <TableCell>Last Session</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow
                key={student.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.sessionsAttended}</TableCell>
                <TableCell>{student.averageScore}%</TableCell>
                <TableCell>{student.lastSession}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenModal(student)}
                      color="tertiary"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => downloadReport(student)}
                    >
                      <FileDownload />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedStudent && (
        <StudentReportModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          student={selectedStudent}
        />
      )}

      {/* Message Component */}
      <Message
        open={message.open}
        message={message.message}
        severity={message.severity}
        onClose={handleCloseMessage}
      />
    </div>
  );
}

function StudentReportModal({ isOpen, onClose, student }) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: "#4B8EFA",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Student Progress Report
      </DialogTitle>
      <DialogContent sx={{ padding: "24px 36px" }}>
        <div className="space-y-4">
          <div>
            <strong>Student Name:</strong> {student.name}
          </div>
          <div>
            <strong>Course:</strong> {student.course}
          </div>
          <div>
            <strong>Sessions Attended:</strong> {student.sessionsAttended}
          </div>
          <div>
            <strong>Average Score:</strong> {student.averageScore}%
          </div>
          <div>
            <strong>Last Session:</strong> {student.lastSession}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
