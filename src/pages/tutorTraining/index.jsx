import { Divider, useTheme } from "@mui/material";
import React, { useState } from "react";
import { FaUser, FaFileUpload, FaRegCheckCircle } from "react-icons/fa";
import { tokens } from "../../theme";

const TutorTraining = () => {
  const [trainings, setTrainings] = useState([]);
  const [tutorName, setTutorName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [trainingLevel, setTrainingLevel] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [formError, setFormError] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tutorName || !courseName || !trainingLevel || !certificateFile) {
      setFormError("All fields are required.");
      return;
    }

    const newTraining = {
      id: Date.now(),
      tutorName,
      courseName,
      trainingLevel,
      certificateFile,
    };

    setTrainings([...trainings, newTraining]);
    // Clear form fields
    setTutorName("");
    setCourseName("");
    setTrainingLevel("");
    setCertificateFile(null);
    setFormError(""); // Clear error message if form is valid
  };

  // Handle certificate file upload
  const handleFileChange = (e) => {
    setCertificateFile(e.target.files[0]);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className="p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-xl font-semibold dark:text-white">
        Tutor Training Management
      </h2>

      {/* Form to Add Tutor Training */}
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-lg shadow-md"
        style={{
          backgroundColor: colors.primary[400],
          color: colors.primary[100],
        }}
      >
        <div className="space-y-4">
          <div>
            <label className="block dark:text-white">Tutor Name</label>
            <input
              type="text"
              value={tutorName}
              onChange={(e) => setTutorName(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white"
              placeholder="Enter Tutor's Name"
              style={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
              }}
            />
          </div>

          <div>
            <label className="block dark:text-white">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white"
              placeholder="Enter Course Name"
              style={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
              }}
            />
          </div>

          <div>
            <label className="block dark:text-white">Training Level</label>
            <select
              value={trainingLevel}
              onChange={(e) => setTrainingLevel(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white"
              style={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
              }}
            >
              <option value="">Select Training Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block dark:text-white">Upload Certificate</label>
            <input
              type="file"
              accept=".pdf,.docx,.jpg,.png"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white"
            />
          </div>

          {formError && (
            <p className="text-red-500 text-sm mt-2">{formError}</p>
          )}

          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition-all"
              style={{
                backgroundColor: colors.greenAccent[400],
                // color: colors.primary[100],
              }}
            >
              Add Training
            </button>
          </div>
        </div>
      </form>

      <Divider />

      {/* Training Sessions List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold dark:text-white">
          Registered Trainings
        </h3>

        {trainings.length > 0 ? (
          trainings.map((training) => (
            <div
              key={training.id}
              className="flex justify-between items-center p-4 dark:bg-gray-700 rounded-lg shadow-md"
              style={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
              }}
            >
              <div className="flex items-center space-x-4">
                <FaUser className="text-blue-500 text-5xl rounded-lg border" />
                <div>
                  <h4 className="text-lg font-semibold dark:text-white">
                    {training.tutorName}
                  </h4>
                  <p className="dark:text-gray-300">{training.courseName}</p>
                  <p className="dark:text-gray-400">{training.trainingLevel}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href={URL.createObjectURL(training.certificateFile)}
                  download={training.certificateFile.name}
                  className="flex items-center text-green-500 hover:text-green-700"
                >
                  <FaFileUpload className="mr-2" />
                  Download Certificate
                </a>
                <FaRegCheckCircle className="text-green-500" />
              </div>
            </div>
          ))
        ) : (
          <p className="dark:text-gray-300">No training sessions added yet.</p>
        )}
      </div>
    </div>
  );
};

export default TutorTraining;
