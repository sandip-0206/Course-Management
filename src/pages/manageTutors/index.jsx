import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const ManageTutors = ({ onSelect }) => {
  const [selectedTutor, setSelectedTutor] = useState(null);

  const tutors = [
    {
      id: 1,
      name: "John Doe",
      subjects: ["Math"],
      photo: "/tutor1.jpg",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Jane Smith",
      subjects: ["English"],
      photo: "/tutor2.jpg",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Emily Johnson",
      subjects: ["Science"],
      photo: "/tutor3.jpg",
      rating: 4.2,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {tutors.map((tutor) => (
        <Card key={tutor.id} className="max-w-sm shadow-lg">
          <CardMedia
            component="img"
            alt={tutor.name}
            height="200"
            image={tutor.photo}
            className="rounded-t-lg"
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {tutor.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Subjects: {tutor.subjects.join(", ")}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              ⭐ {tutor.rating}/5
            </Typography>
            <Button
              onClick={() => onSelect(tutor)}
              variant="contained"
              color="primary"
              className="mt-4"
            >
              Book Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ManageTutors;
