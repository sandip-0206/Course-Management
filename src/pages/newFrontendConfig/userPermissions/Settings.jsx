import React, { useState } from "react";
import { purple } from "@mui/material/colors";
import { Divider, Radio, useMediaQuery, useTheme } from "@mui/material";
import styled from "styled-components";

const Settings = () => {
  const [defaultRole, setDefaultRole] = useState("Viewer");
  const [customRole, setCustomRole] = useState(false);
  const [globalAccess, setGlobalAccess] = useState("Full data access");
  const [notificationFrequency, setNotificationFrequency] = useState("Weekly");
  const [bulkActionsEnabled, setBulkActionsEnabled] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div style={{}}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "30px",
          margin: "3rem 0",
          padding: "20px 0",
        }}
      >
        <ContentWrapper
          isLargeScreen={isLargeScreen}
          isMediumScreen={isMediumScreen}
        >
          <SectionTitle>Default Role Assignment</SectionTitle>
          <Description>
            Set default roles for new users across the product.
          </Description>
        </ContentWrapper>
        <ContentWrapper2>
          <Select
            value={defaultRole}
            onChange={(e) => setDefaultRole(e.target.value)}
          >
            <option value="Viewer">Viewer</option>
            <option value="Editor">Editor</option>
            <option value="Admin">Admin</option>
          </Select>
        </ContentWrapper2>
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "30px",
          margin: "3rem 0",
          padding: "20px 0",
        }}
      >
        <ContentWrapper
          isLargeScreen={isLargeScreen}
          isMediumScreen={isMediumScreen}
        >
          <SectionTitle>Custom Role Creation</SectionTitle>
          <Description>
            Design unique roles with tailored permissions to meet organizational
            needs.
          </Description>
        </ContentWrapper>
        <ContentWrapper2>
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              checked={customRole}
              onChange={(e) => setCustomRole(e.target.checked)}
            />
            <Slider checked={customRole} />
            <Circle checked={customRole} />
          </CheckboxWrapper>
        </ContentWrapper2>
      </div>
      <Divider />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "30px",
          margin: "3rem 0",
          padding: "20px 0",
        }}
      >
        <ContentWrapper
          isLargeScreen={isLargeScreen}
          isMediumScreen={isMediumScreen}
        >
          <SectionTitle>Global Data Access Levels</SectionTitle>
          <Description>
            Configure access to customer or product data across the platform.
          </Description>
        </ContentWrapper>
        <ContentWrapper2>
          {["Full data access", "Data access limited by team", "No access"].map(
            (option) => (
              <RadioWrapper key={option}>
                <Radio
                  value={option}
                  checked={globalAccess === option}
                  onChange={(e) => setGlobalAccess(e.target.value)}
                  sx={{
                    padding: "4px 0",
                    color: purple[800],
                    "&.Mui-checked": {
                      color: purple[600],
                    },
                  }}
                />
                <span>{option}</span>
              </RadioWrapper>
            )
          )}
        </ContentWrapper2>
      </div>
      <Divider />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "30px",
          margin: "3rem 0",
          padding: "20px 0",
        }}
      >
        <ContentWrapper
          isLargeScreen={isLargeScreen}
          isMediumScreen={isMediumScreen}
        >
          <SectionTitle>Notification Frequency</SectionTitle>
          <Description>
            Choose to be notified daily, weekly, or monthly, depending on how
            often you want reminders.
          </Description>
        </ContentWrapper>
        <ContentWrapper2>
          <Select
            value={notificationFrequency}
            onChange={(e) => setNotificationFrequency(e.target.value)}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </Select>
        </ContentWrapper2>
      </div>
      <Divider />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "30px",
          margin: "3rem 0",
          padding: "20px 0",
        }}
      >
        <ContentWrapper
          isLargeScreen={isLargeScreen}
          isMediumScreen={isMediumScreen}
        >
          <SectionTitle>Enable Bulk Actions</SectionTitle>
          <Description>
            When enabled, this feature allows you to select multiple schedules
            and perform actions such as editing or deleting them all at once.
          </Description>
        </ContentWrapper>
        <ContentWrapper2>
          <CheckboxWrapper>
            <Checkbox
              type="checkbox"
              checked={bulkActionsEnabled}
              onChange={(e) => setBulkActionsEnabled(e.target.checked)}
            />
            <Slider checked={bulkActionsEnabled} />
            <Circle checked={bulkActionsEnabled} />
          </CheckboxWrapper>
        </ContentWrapper2>
      </div>
    </div>
  );
};

export default Settings;

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
