import React, { useEffect, useState } from "react";
import { Divider, Radio, useMediaQuery, useTheme } from "@mui/material";
import { purple } from "@mui/material/colors";
import styled, { css } from "styled-components";
import Team from "./Team";
import Settings from "./Settings";

// Main Component

const UserPermissions = ({
  activeMenu,
  setActiveMenu,
  activeTab,
  setActiveTab,
}) => {
  console.log("activeMenu", activeMenu);

  const [defaultRole, setDefaultRole] = useState("Viewer");

  const [customRole, setCustomRole] = useState(false);
  const [globalAccess, setGlobalAccess] = useState("Full data access");
  const [notificationFrequency, setNotificationFrequency] = useState("Weekly");
  const [bulkActionsEnabled, setBulkActionsEnabled] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Viewer" },
  ]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Viewer");

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      setTeamMembers([
        ...teamMembers,
        { id: Date.now(), name: newMemberName, role: newMemberRole },
      ]);
      setNewMemberName("");
      setNewMemberRole("Viewer");
    }
  };

  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  useEffect(() => {
    if (activeMenu === "Team") {
      setActiveTab("Team");
    }
    if (activeMenu === "Settings") {
      setActiveTab("Settings");
    }
  }, [activeMenu]);

  return (
    <Container>
      {/* Header */}
      <Header>
        <Title>User Permissions</Title>
        <TabsContainer>
          <TabButton
            isActive={activeTab === "Settings"}
            onClick={() => setActiveTab("Settings")}
          >
            Settings
          </TabButton>
          <TabButton
            isActive={activeTab === "Team"}
            onClick={() => setActiveTab("Team")}
          >
            Team
          </TabButton>
        </TabsContainer>
        <Divider />
      </Header>

      {/* Content */}
      {activeTab === "Settings" ? <Settings /> : <Team />}
    </Container>
  );
};

export default UserPermissions;

// Styled Components

export const Container = styled.div`
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem 1.5rem 0 1.5rem;
  min-height: 100%;
  border-radius: 0.5rem;
  margin-right: 1rem;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
  color: #2563eb;
`;

export const TabsContainer = styled.div`
  display: flex;
  padding-top: 0.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  gap: 2rem;
`;

export const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  border-radius: 9999px; /* rounded-full */
  transition: all 0.3s ease;
  transform: scale(1);
  background: white;
  color: #4b5563; /* text-gray-600 */
  // border-bottom: 2px solid transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* shadow-md */

  ${(props) =>
    props.isActive
      ? css`
          background: linear-gradient(to right, #3b82f6, #2563eb, #1d4ed8);
          color: white;
        `
      : css`
          &:hover {
            background: #5d91ec;
            color: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
        `}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: ${({ isLargeScreen, isMediumScreen }) =>
    isLargeScreen || isMediumScreen ? "100%" : "40%"};
`;

const ContentWrapper2 = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: ${({ isLargeScreen, isMediumScreen }) =>
    isLargeScreen || isMediumScreen ? "100%" : "40%"};
  // padding: 10px;
  margin-left: ${({ isLargeScreen, isMediumScreen }) =>
    isLargeScreen || isMediumScreen ? "8rem" : "0"};
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #4a5568;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #718096;
  width: 70%;
  margin-top: 0.25rem;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  transition: border-color 0.2s;
  width: 7rem;
  &:focus {
    outline: none;
    border-color: #3182ce;
  }
`;

const CheckboxWrapper = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const Checkbox = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const Slider = styled.div`
  width: 2.75rem;
  height: 1.5rem;
  background-color: #e2e8f0;
  border-radius: 9999px;
  transition: background-color 0.3s;
  ${({ checked }) => checked && `background-color: #805ad5;`}
`;

const Circle = styled.div`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  background-color: white;
  border-radius: 9999px;
  transition: transform 0.3s;
  ${({ checked }) => checked && `transform: translateX(1.25rem);`}
`;

const RadioWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RemoveButton = styled.button`
  color: #f56565;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    color: #e53e3e;
  }
`;

const AddMemberButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3182ce;
  color: white;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  &:hover {
    background-color: #2b6cb0;
  }
`;
