import React, { useState } from "react";
import styled from "styled-components";
// import {
//   Container,
//   Header,
//   TabButton,
//   TabsContainer,
//   Title,
// } from "./MainContent";
import { Divider } from "@mui/material";
// import SettingContent from "./SettingContent";

const Team = ({ activeTab, setActiveTab }) => {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "John Doe", role: "Admin" },
    { id: 2, name: "Jane Smith", role: "Viewer" },
  ]);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Viewer");
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
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-600">Team Settings</h3>
      <ul className="mt-4 space-y-3">
        {teamMembers.map((member) => (
          <li key={member.id} className="flex justify-between items-center">
            <span className="text-gray-700">
              {member.name} - {member.role}
            </span>
            <RemoveButton onClick={() => handleRemoveMember(member.id)}>
              Remove
            </RemoveButton>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h4 className="text-md font-medium text-gray-700">Add New Member</h4>
        <InputWrapper>
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            className="w-64 px-3 py-2 border border-gray-300 rounded-md text-sm"
            placeholder="Enter member name"
          />
          <Select
            value={newMemberRole}
            onChange={(e) => setNewMemberRole(e.target.value)}
          >
            <option value="Viewer">Viewer</option>
            <option value="Editor">Editor</option>
            <option value="Admin">Admin</option>
          </Select>
          <AddMemberButton onClick={handleAddMember}>
            Add Member
          </AddMemberButton>
        </InputWrapper>
      </div>
    </div>
  );
};

export default Team;

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
