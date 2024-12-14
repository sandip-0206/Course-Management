import React, { useEffect } from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 240px;
  border-right: 1px solid #e5e7eb;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const SidebarHeader = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
  color: #2563eb;
  padding: 16px 15px;
`;

const MenuList = styled.ul`
  padding: 0 16px;
  list-style: none;
`;

const MenuItem = styled.li`
  margin-bottom: 24px;
`;

const MenuItemTitle = styled.div`
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  color: #4b5563;
  margin-bottom: 8px;
`;

const SubMenuList = styled.ul`
  padding-left: 16px;
  list-style: none;
`;

const SubMenuItem = styled.li`
  font-size: 12px;
  cursor: pointer;
  border-radius: 8px;
  padding: 10px;
  margin: 4px 0;
  gap: 5px;
  transition: background-color 0.2s, color 0.2s;
  color: ${(props) => (props.isActive ? "#fff" : "#374151")};
  background-color: ${(props) => (props.isActive ? "#2563eb" : "transparent")};

  &:hover {
    background-color: ${(props) => (props.isActive ? "#2563eb" : "#ebf8ff")};
    color: ${(props) => (props.isActive ? "#fff" : "#1d4ed8")};
  }
`;

const Sidebar = ({ activeMenu, setActiveMenu, activeTab, setActiveTab }) => {
  const menuItems = [
    {
      name: "General",
      subItems: [
        "Personal Information",
        "Default Configurations",
        "Theme Settings",
      ],
    },
    {
      name: "Schedules",
      subItems: ["Display Preferences", "Notifications & Actions"],
    },
    {
      name: "Billing & Payment",
      subItems: ["Invoice", "Subscription Management", "Payment Gateway"],
    },
    {
      name: "Privacy & Security",
      subItems: ["Two-factor Authentication", "Data Encryption"],
    },
    {
      name: "User Permissions",
      subItems: ["Team", "Settings"],
    },
    {
      name: "Integration",
      subItems: ["Third-party", "API Access"],
    },
    {
      name: "Notification",
      subItems: ["Email and In-app", "Custom Alerts"],
    },
  ];

  console.log("activeTab", activeTab);

  useEffect(() => {
    if (activeTab === "Team") {
      setActiveMenu("Team");
    }
    if (activeTab === "Settings") {
      setActiveMenu("Settings");
    }
  }, [activeTab]);

  const handleMenuClick = (subItem) => {
    setActiveMenu(subItem);
  };

  return (
    <SidebarContainer>
      <SidebarHeader>Frontend Config</SidebarHeader>
      <MenuList>
        {menuItems.map((item, index) => (
          <MenuItem key={index}>
            <MenuItemTitle>{item.name}</MenuItemTitle>
            {item.subItems && (
              <SubMenuList>
                {item.subItems.map((subItem, i) => (
                  <SubMenuItem
                    key={i}
                    isActive={activeMenu === subItem}
                    onClick={() => handleMenuClick(subItem)}
                  >
                    {subItem}
                  </SubMenuItem>
                ))}
              </SubMenuList>
            )}
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;
