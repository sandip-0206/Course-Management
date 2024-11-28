import { useTheme } from "@mui/material";
import React, { useState } from "react";
import { FaSearch, FaDownload, FaEye } from "react-icons/fa";
import { tokens } from "../../theme";

const Ebooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ebooks, setEbooks] = useState([
    {
      id: 1,
      title: "JavaScript for Beginners",
      author: "John Doe",
      description: "A beginner's guide to JavaScript",
      image: "https://via.placeholder.com/150x200.png?text=JS+for+Beginners",
      downloadLink: "#",
      detailedDescription:
        "This book covers everything from basic JavaScript syntax to advanced concepts.",
    },
    {
      id: 2,
      title: "React in Action",
      author: "Jane Smith",
      description: "Master React with this hands-on guide",
      image: "https://via.placeholder.com/150x200.png?text=React+in+Action",
      downloadLink: "#",
      detailedDescription:
        "A deep dive into React hooks, components, and state management.",
    },
    {
      id: 3,
      title: "Learning Python",
      author: "Alice Johnson",
      description: "The essential guide to Python programming",
      image: "https://via.placeholder.com/150x200.png?text=Learning+Python",
      downloadLink: "#",
      detailedDescription:
        "Learn Python fundamentals with examples and exercises.",
    },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEbook, setSelectedEbook] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEbooks = ebooks.filter(
    (ebook) =>
      ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (id) => {
    const ebook = ebooks.find((ebook) => ebook.id === id);
    window.location.href = ebook.downloadLink; // Replace with actual download link
  };

  const handleViewDetails = (ebook) => {
    setSelectedEbook(ebook);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEbook(null);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div
      className="p-6 dark:bg-gray-800 rounded-lg shadow-md"
      style={{ color: colors.primary[100] }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-white">Ebooks</h2>

        <div className="flex items-center">
          <input
            type="text"
            className="p-2 border rounded-md mr-4 dark:bg-gray-700 dark:text-white"
            placeholder="Search eBooks..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              backgroundColor: colors.primary[400],
              color: colors.primary[100],
            }}
          />
          <FaSearch className="cursor-pointer" />
        </div>
      </div>

      <div className="space-y-6">
        {filteredEbooks.length > 0 ? (
          filteredEbooks.map((ebook) => (
            <div
              key={ebook.id}
              className="dark:bg-gray-700 p-4 rounded-lg shadow-md flex
               justify-between items-center transition-transform transform"
              style={{
                backgroundColor: colors.primary[700],
                color: colors.primary[100],
              }}
            >
              <div className="flex items-center space-x-6">
                <img
                  src={ebook.image}
                  alt={ebook.title}
                  className="w-32 h-40 object-cover rounded-lg shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold dark:text-white">
                    {ebook.title}
                  </h3>
                  <p className=" dark:text-gray-300">{ebook.author}</p>
                  <p className="dark:text-gray-400">{ebook.description}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleViewDetails(ebook)}
                  className="text-blue-500 hover:text-blue-700 transition-all flex items-center border p-2 rounded-lg"
                >
                  <FaEye className="mr-2" />
                  View Details
                </button>
                <button
                  onClick={() => handleDownload(ebook.id)}
                  className="text-green-500 hover:text-green-700 transition-all flex items-center border p-2 rounded-lg"
                >
                  <FaDownload className="mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No eBooks found.
          </p>
        )}
      </div>

      {/* Modal for eBook Details */}
      {modalIsOpen && selectedEbook && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {selectedEbook.title}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {selectedEbook.author}
            </p>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              {selectedEbook.detailedDescription}
            </p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
              >
                Close
              </button>
              <button
                onClick={() => handleDownload(selectedEbook.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ebooks;
