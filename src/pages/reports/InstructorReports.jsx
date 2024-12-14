import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
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
import { tokens } from "../../theme";

export default function InstructorReports() {
  const theme = useTheme();
  const [instructors, setInstructors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulated fetching of instructor data
    setInstructors([
      {
        id: 1,
        name: "John Doe",
        coursesTaught: 5,
        sessionsConducted: 120,
        averageFeedback: 4.7,
        lastSession: "2024-12-01",
      },
      {
        id: 2,
        name: "Jane Smith",
        coursesTaught: 3,
        sessionsConducted: 85,
        averageFeedback: 4.5,
        lastSession: "2024-11-28",
      },
      {
        id: 3,
        name: "Alice Johnson",
        coursesTaught: 4,
        sessionsConducted: 95,
        averageFeedback: 4.8,
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

  const sortedInstructors = instructors.sort((a, b) => {
    const order = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -order;
    if (a[sortConfig.key] > b[sortConfig.key]) return order;
    return 0;
  });

  const filteredInstructors = sortedInstructors.filter((instructor) =>
    instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (instructor) => {
    setSelectedInstructor(instructor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInstructor(null);
  };

  const downloadReport = (instructor) => {
    const reportData = `
      Instructor Name: ${instructor.name}
      Courses Taught: ${instructor.coursesTaught}
      Sessions Conducted: ${instructor.sessionsConducted}
      Average Feedback: ${instructor.averageFeedback} Stars
      Last Session: ${instructor.lastSession}
    `;
    const blob = new Blob([reportData], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${instructor.name}_Instructor_Report.txt`;
    link.click();
  };

  const colors = tokens(theme.palette.mode);

  return (
    <div className="p-6 gap-4 flex flex-wrap justify-between">
      <h1 className="text-3xl font-bold text-center text-indigo-600">
        Instructor Reports
      </h1>

      <div className="flex gap-4 justify-between items-center">
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by Instructor Name"
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
          onClick={() => alert("Generate Report Functionality")}
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
                  Instructor Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "coursesTaught"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("coursesTaught")}
                >
                  Courses Taught
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "sessionsConducted"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("sessionsConducted")}
                >
                  Sessions Conducted
                </TableSortLabel>
              </TableCell>
              <TableCell>Average Feedback</TableCell>
              <TableCell>Last Session</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInstructors.map((instructor) => (
              <TableRow
                key={instructor.id}
                hover
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell>{instructor.name}</TableCell>
                <TableCell>{instructor.coursesTaught}</TableCell>
                <TableCell>{instructor.sessionsConducted}</TableCell>
                <TableCell>{instructor.averageFeedback} Stars</TableCell>
                <TableCell>{instructor.lastSession}</TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenModal(instructor)}
                      color="tertiary"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => downloadReport(instructor)}
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

      {selectedInstructor && (
        <InstructorReportModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          instructor={selectedInstructor}
        />
      )}
    </div>
  );
}

function InstructorReportModal({ isOpen, onClose, instructor }) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: "#4B8EFA",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Instructor Report
      </DialogTitle>
      <DialogContent sx={{ padding: "24px 36px" }}>
        <div className="space-y-4">
          <div>
            <strong>Instructor Name:</strong> {instructor.name}
          </div>
          <div>
            <strong>Courses Taught:</strong> {instructor.coursesTaught}
          </div>
          <div>
            <strong>Sessions Conducted:</strong> {instructor.sessionsConducted}
          </div>
          <div>
            <strong>Average Feedback:</strong> {instructor.averageFeedback}{" "}
            Stars
          </div>
          <div>
            <strong>Last Session:</strong> {instructor.lastSession}
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
