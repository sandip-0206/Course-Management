import React, { useEffect, useRef, useState } from "react";
import { MdSearch, MdSort, MdFilterList, MdMoreHoriz } from "react-icons/md";
import Modal from "./Modal"; // Import the modal component
import CourseStats from "./CourseStats";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const CourseList = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Product Photography Techniques",
      category: "Web Design",
      lesson: "Section 1",
      students: 5,
      status: "Active",
      price: "Free",
    },
    {
      id: 2,
      title: "Mobile App Design with Figma",
      category: "Graphic Design",
      lesson: "Section 2",
      students: 8,
      status: "Active",
      price: "Free",
    },
    {
      id: 3,
      title: "HTML & CSS for Beginners",
      category: "Digital Marketing",
      lesson: "Section 3",
      students: 10,
      status: "Upcoming",
      price: "Free",
    },
    {
      id: 4,
      title: "SEO Strategies for Business Growth",
      category: "Programming",
      lesson: "Section 4",
      students: 12,
      status: "Active",
      price: "Free",
    },
    {
      id: 5,
      title: "Visual Effects (VFX) Fundamentals",
      category: "Motion Graphics",
      lesson: "Section 5",
      students: 15,
      status: "Active",
      price: "Free",
    },
    {
      id: 6,
      title: "Creating Engaging Content",
      category: "Video Editing",
      lesson: "Section 6",
      students: 20,
      status: "Upcoming",
      price: "Free",
    },
    {
      id: 7,
      title: "Creativity: Stunning Logos",
      category: "Photography",
      lesson: "Section 7",
      students: 25,
      status: "Active",
      price: "Free",
    },
    {
      id: 8,
      title: "Animation Basics with After Effects",
      category: "Animation",
      lesson: "Section 8",
      students: 30,
      status: "Active",
      price: "Free",
    },
    {
      id: 9,
      title: "Advanced Graphic Design Techniques",
      category: "Graphic Design",
      lesson: "Section 9",
      students: 34,
      status: "Active",
      price: "Free",
    },
    {
      id: 10,
      title: "Mastering WordPress Development",
      category: "Web Design",
      lesson: "Section 10",
      students: 40,
      status: "Active",
      price: "Free",
    },
    // Add initial course data
  ]);

  const [activeDropdown, setActiveDropdown] = useState(null); // Track which dropdown is open
  const [modalData, setModalData] = useState(null); // Data for the modal
  const [isStatusEditing, setIsStatusEditing] = useState(null); // Track status editing
  const dropdownRef = useRef();
  const modalRef = useRef();

  const [filteredCourses, setFilteredCourses] = useState(courses); // To hold filtered/sorted courses
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [sortCriteria, setSortCriteria] = useState(""); // Sorting criteria
  const [filterCategory, setFilterCategory] = useState(""); // Filter category

  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage, setItemsPerPage] = useState(10); // Items per page (you can adjust this number)

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [courseForm, setCourseForm] = useState({
    id: "",
    title: "",
    category: "",
    lesson: "",
    students: "",
    status: "Active",
    price: "",
  }); // Track form data

  const handleAction = (action, course) => {
    if (action === "add") {
      setCourseForm({
        id: courses.length + 1, // Generate new ID
        title: "",
        category: "",
        lesson: "",
        students: "",
        status: "Active",
        price: "",
      });
    } else if (course) {
      setCourseForm(course); // Set form values for editing/viewing
    }
    setModalData({ action });
  };

  const handleSave = () => {
    if (modalData.action === "add") {
      setCourses((prev) => [...prev, courseForm]); // Add new course
    } else if (modalData.action === "edit") {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseForm.id ? { ...courseForm } : course
        )
      ); // Update course
    }
    setModalData(null); // Close modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateStatus = (courseId, newStatus) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId ? { ...course, status: newStatus } : course
      )
    );
    setIsStatusEditing(null); // Close status editor
  };

  useEffect(() => {
    let updatedCourses = [...courses];

    // Filter by category
    if (filterCategory) {
      updatedCourses = updatedCourses.filter(
        (course) =>
          course.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Search by title
    if (searchQuery) {
      updatedCourses = updatedCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort courses
    if (sortCriteria) {
      updatedCourses.sort((a, b) => {
        if (sortCriteria === "title") {
          return a.title.localeCompare(b.title);
        } else if (sortCriteria === "students") {
          return b.students - a.students; // Sort by enrolled students descending
        }
        return 0;
      });
    }

    setFilteredCourses(updatedCourses);
  }, [searchQuery, sortCriteria, filterCategory, courses]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSortChange = (e) => setSortCriteria(e.target.value);

  const handleFilterChange = (e) => setFilterCategory(e.target.value);

  useEffect(() => {
    if (modalData?.action) {
      setActiveDropdown(null);
      setIsStatusEditing(null);
    }
  }, [modalData?.action]);

  return (
    <>
      <CourseStats />
      <div
        className="p-4 rounded shadow-md m-3"
        style={{
          backgroundColor: colors.primary[400],
          color: colors.primary[100],
        }}
      >
        {/* Header */}
        <div
          className="flex flex-wrap justify-between items-center mb-4 gap-5"
          style={{
            backgroundColor: colors.primary[400],
            color: colors.primary[100],
          }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Course List
          </h2>
          {/* Controls: Sort, Filter, and Search */}
          <div className="relative flex items-center space-x-2">
            <MdSearch className="absolute left-6 top-3 text-gray-500 text-xl sm:text-2xl" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border p-2 pl-10 rounded w-64 sm:w-80 md:w-96" // Adjust width for responsiveness
              style={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
              }}
            />
          </div>

          {/* Filter */}
          <div className="relative flex items-center">
            <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl" />
            <select
              value={filterCategory}
              onChange={handleFilterChange}
              className="border p-2 pl-10 rounded w-40 sm:w-48 md:w-56"
              style={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
              }}
            >
              <option value="">Filter by Category</option>
              <option value="Web Design">Web Design</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Programming">Programming</option>
              <option value="Photography">Photography</option>
              <option value="Animation">Animation</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Motion Graphics">Motion Graphics</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative flex items-center">
            <MdSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl" />
            <select
              value={sortCriteria}
              onChange={handleSortChange}
              className="border p-2 pl-10 rounded w-40 sm:w-48 md:w-56"
              style={{
                backgroundColor: colors.primary[400],
                color: colors.primary[100],
              }}
            >
              <option value="">Sort by</option>
              <option value="title">Title (A-Z)</option>
              <option value="students">Enrolled Students</option>
            </select>
          </div>

          {/* Add Course Button */}
          <button
            className="px-4 py-2 rounded mt-2 sm:mt-0"
            style={{
              backgroundColor: colors.greenAccent[400],
              color: colors.primary[401],
            }}
            onClick={() => handleAction("add")}
          >
            + Add New Course
          </button>
        </div>

        {/* Course Table */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-sm sm:text-base md:text-lg">Title</th>
                <th className="py-2 text-sm sm:text-base md:text-lg">
                  Category
                </th>
                <th className="py-2 text-sm sm:text-base md:text-lg">
                  Lesson & Section
                </th>
                <th className="py-2 text-sm sm:text-base md:text-lg">
                  Enrolled Students
                </th>
                <th className="py-2 text-sm sm:text-base md:text-lg">Status</th>
                <th className="py-2 text-sm sm:text-base md:text-lg">Price</th>
                <th className="py-2 text-sm sm:text-base md:text-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.map((course) => (
                <tr key={course.id} className="border-b border-sky-500 py-4">
                  <td className="py-4 text-sm sm:text-base md:text-lg">
                    {course.title}
                  </td>
                  <td className="py-4 text-sm sm:text-base md:text-lg text-blue-600">
                    {course.category}
                  </td>
                  <td className="py-4 text-sm sm:text-base md:text-lg text-blue-600">
                    {course.lesson}
                  </td>
                  <td className="py-4 text-sm sm:text-base md:text-lg">
                    {course.students}
                  </td>
                  <td
                    className="py-4 relative text-sm sm:text-base md:text-lg"
                    ref={dropdownRef}
                  >
                    {isStatusEditing === course.id ? (
                      <div className="absolute left-0 border rounded shadow-md w-32 mt-2 z-10">
                        <ul className="text-sm">
                          {["Active", "Upcoming", "Inactive", "Pending"].map(
                            (status) => (
                              <li
                                key={status}
                                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                  course.status === status ? "font-bold" : ""
                                }`}
                                onClick={() => updateStatus(course.id, status)}
                              >
                                {status}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium cursor-pointer ${
                          course.status === "Active"
                            ? "bg-green-100 text-green-600"
                            : course.status === "Upcoming"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                        onClick={() => setIsStatusEditing(course.id)}
                      >
                        {course.status}
                      </span>
                    )}
                  </td>
                  <td className="py-2 text-sm sm:text-base md:text-lg">
                    {course.price}
                  </td>
                  <td
                    className="py-2 relative text-sm sm:text-base md:text-lg"
                    ref={dropdownRef}
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        setActiveDropdown((prev) =>
                          prev === course.id ? null : course.id
                        )
                      }
                    >
                      <MdMoreHoriz />
                    </div>
                    {activeDropdown === course.id && (
                      <div
                        className="absolute right-0 border rounded shadow-md w-32 mt-2 z-10"
                        style={{ backgroundColor: colors.primary[400] }}
                      >
                        <ul
                          className="text-sm"
                          style={{
                            backgroundColor: colors.primary[400],
                            color: colors.primary[100],
                          }}
                        >
                          <li
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleAction("view", course)}
                          >
                            View
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleAction("edit", course)}
                          >
                            Edit
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                            onClick={() =>
                              setCourses(
                                courses.filter((c) => c.id !== course.id)
                              )
                            }
                          >
                            Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="text-gray-700 p-2 rounded text-sm sm:text-base"
            style={{
              backgroundColor: colors.primary[700],
              color: colors.primary[100],
              cursor: "pointer",
            }}
          >
            Previous
          </button>

          <div>
            <span className="text-sm sm:text-base">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-200 text-gray-700 p-2 rounded text-sm sm:text-base"
            style={{
              backgroundColor: colors.primary[700],
              color: colors.primary[100],
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        colors={colors}
        theme={theme}
        title={
          modalData?.action === "view"
            ? "View Course"
            : modalData?.action === "edit"
            ? "Edit Course"
            : "Add New Course"
        }
      >
        <div ref={modalRef} className="max-w-lg w-full sm-:w-md p-4 mx-auto">
          <form>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm sm:text-base">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={courseForm.title}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm sm:text-base">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={courseForm.category}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lesson" className="block text-sm sm:text-base">
                Lesson
              </label>
              <input
                type="text"
                id="lesson"
                name="lesson"
                value={courseForm.lesson}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="students" className="block text-sm sm:text-base">
                Students
              </label>
              <input
                type="number"
                id="students"
                name="students"
                value={courseForm.students}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm sm:text-base">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={courseForm.price}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm sm:text-base">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={courseForm.status}
                onChange={handleInputChange}
                className="border p-2 w-full rounded"
              >
                <option value="Active">Active</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4 mx-auto block w-full sm:w-auto"
            >
              Save
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CourseList;
