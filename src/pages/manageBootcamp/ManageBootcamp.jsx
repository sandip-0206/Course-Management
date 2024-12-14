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

export default function BootcampManagement() {
  const [bootcamps, setBootcamps] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBootcamp, setCurrentBootcamp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    // Simulated fetch for initial data
    setBootcamps([
      {
        id: 1,
        name: "React Bootcamp",
        instructor: "Jane Doe",
        status: "Active",
      },
      {
        id: 2,
        name: "Node.js Bootcamp",
        instructor: "John Smith",
        status: "Completed",
      },
    ]);
  }, []);

  const handleOpenModal = (bootcamp = null) => {
    setCurrentBootcamp(bootcamp);
    setIsEditing(!!bootcamp);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentBootcamp(null);
    setIsEditing(false);
  };

  const handleSave = (data) => {
    if (isEditing) {
      setBootcamps(
        bootcamps.map((b) =>
          b.id === currentBootcamp.id ? { ...currentBootcamp, ...data } : b
        )
      );
    } else {
      setBootcamps([...bootcamps, { id: Date.now(), ...data }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this bootcamp?")) {
      setBootcamps(bootcamps.filter((b) => b.id !== id));
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedBootcamps = bootcamps.sort((a, b) => {
    const order = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -order;
    if (a[sortConfig.key] > b[sortConfig.key]) return order;
    return 0;
  });

  const filteredBootcamps = sortedBootcamps.filter((bootcamp) => {
    const matchesSearch =
      bootcamp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bootcamp.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus
      ? bootcamp.status === filterStatus
      : true;
    return matchesSearch && matchesFilter;
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="p-6">
      {/* <Box display="flex" justifyContent="space-between">
        <h1 className="text-2xl font-bold mb-6">Bootcamp Management</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal()}
        >
          Add Bootcamp
        </Button>

        <div className="my-4 flex gap-4">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search Bootcamp"
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
          <TextField
            select
            label="Filter by Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            size="small"
            SelectProps={{ native: true }}
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </TextField>
        </div>
      </Box> */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <h1 className="text-2xl font-bold mb-6">Manage BootCamp</h1>
        <Box display="flex" flexWrap="wrap" gap={2} mb={6}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
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
          <TextField
            select
            // label="Filter by Expertise"
            // value={filterExpertise}
            // onChange={(e) => setFilterExpertise(e.target.value)}
            size="small"
            SelectProps={{ native: true }}
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Completed">Pending</option>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal()}
          >
            Add Bootcamp
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
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "instructor"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("instructor")}
                >
                  Instructor
                </TableSortLabel>
              </TableCell>
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
            {filteredBootcamps.map((bootcamp) => (
              <TableRow key={bootcamp.id}>
                <TableCell>{bootcamp.name}</TableCell>
                <TableCell>{bootcamp.instructor}</TableCell>
                <TableCell>{bootcamp.status}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenModal(bootcamp)}
                  >
                    <Edit color="secondary" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(bootcamp.id)}
                  >
                    <DeleteOutline color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BootcampModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        isEditing={isEditing}
        currentBootcamp={currentBootcamp}
      />
    </div>
  );
}

function BootcampModal({
  isOpen,
  onClose,
  onSave,
  isEditing,
  currentBootcamp,
}) {
  const [formData, setFormData] = useState({
    name: "",
    instructor: "",
    status: "Active",
  });

  useEffect(() => {
    if (isEditing && currentBootcamp) {
      setFormData(currentBootcamp);
    } else {
      setFormData({ name: "", instructor: "", status: "Active" });
    }
  }, [isEditing, currentBootcamp]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? "Edit Bootcamp" : "Add Bootcamp"}</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Bootcamp Name"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="instructor"
          value={formData.instructor}
          onChange={handleChange}
          label="Instructor"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="status"
          value={formData.status}
          onChange={handleChange}
          label="Status"
          select
          fullWidth
          margin="normal"
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditing ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
