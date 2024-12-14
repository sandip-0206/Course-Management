import React, { useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import { tokens } from "../../theme";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function TrainerEnrollment() {
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      expertise: "React",
      email: "alice@example.com",
    },
    {
      id: 2,
      name: "Bob Smith",
      expertise: "Node.js",
      email: "bob@example.com",
    },
    {
      id: 3,
      name: "Charlie Brown",
      expertise: "Python",
      email: "charlie@example.com",
    },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTrainer, setCurrentTrainer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [filterExpertise, setFilterExpertise] = useState("");

  const handleOpenModal = (trainer = null) => {
    setIsEditing(Boolean(trainer));
    setCurrentTrainer(trainer);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentTrainer(null);
  };

  const handleSave = (trainer) => {
    if (isEditing) {
      setTrainers(
        trainers.map((t) => (t.id === trainer.id ? { ...t, ...trainer } : t))
      );
    } else {
      setTrainers([...trainers, { id: Date.now(), ...trainer }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this trainer?")) {
      setTrainers(trainers.filter((t) => t.id !== id));
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

  const sortedTrainers = trainers.sort((a, b) => {
    const order = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -order;
    if (a[sortConfig.key] > b[sortConfig.key]) return order;
    return 0;
  });

  const filteredTrainers = sortedTrainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterExpertise
      ? trainer.expertise === filterExpertise
      : true;
    return matchesSearch && matchesFilter;
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="p-6">
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <h1 className="text-2xl font-bold mb-6">Trainer Enrollment</h1>
        <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
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
            value={filterExpertise}
            onChange={(e) => setFilterExpertise(e.target.value)}
            size="small"
            SelectProps={{ native: true }}
          >
            <option value="">All</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Python">Python</option>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal()}
          >
            Add Trainer
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
                  active={sortConfig.key === "expertise"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("expertise")}
                >
                  Expertise
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "email"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTrainers.map((trainer) => (
              <TableRow key={trainer.id}>
                <TableCell>{trainer.name}</TableCell>
                <TableCell>{trainer.expertise}</TableCell>
                <TableCell>{trainer.email}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleOpenModal(trainer)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(trainer.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TrainerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        isEditing={isEditing}
        currentTrainer={currentTrainer}
      />
    </div>
  );
}

function TrainerModal({ isOpen, onClose, onSave, isEditing, currentTrainer }) {
  const [formData, setFormData] = useState(
    currentTrainer || { name: "", expertise: "", email: "" }
  );

  React.useEffect(() => {
    if (isEditing && currentTrainer) {
      setFormData(currentTrainer);
    } else {
      setFormData({ name: "", expertise: "", email: "" });
    }
  }, [isEditing, currentTrainer]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: currentTrainer?.id || Date.now() });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          {isEditing ? "Edit Trainer" : "Add Trainer"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          {/* Expertise dropdown */}
          <FormControl fullWidth required margin="normal">
            <InputLabel>Expertise</InputLabel>
            <Select
              label="Expertise"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
            >
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="Node.js">Node.js</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            type="email"
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {isEditing ? "Update Trainer" : "Add Trainer"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
