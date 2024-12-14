import React, { useState } from "react";
import UserPermissions from "./userPermissions";
import Sidebar from "./Sidebar";

const FrontendConfig = () => {
  const [activeMenu, setActiveMenu] = useState("Personal Information"); // State for active menu
  const [activeTab, setActiveTab] = useState("");

  // const PersonalInformation = () => <div>Personal Information Content</div>;
  const DefaultConfigurations = () => <div>Default Configurations Content</div>;
  const ThemeSettings = () => <div>Theme Settings Content</div>;
  const DisplayPreferences = () => <div>Display Preferences Content</div>;
  const NotificationsAndActions = () => (
    <div>Notifications & Actions Content</div>
  );
  const Invoice = () => <div>Invoice Content</div>;
  const SubscriptionManagement = () => (
    <div>Subscription Management Content</div>
  );
  const PaymentGateway = () => <div>Payment Gateway Content</div>;
  const TwoFactorAuthentication = () => (
    <div>Two-factor Authentication Content</div>
  );
  const DataEncryption = () => <div>Data Encryption Content</div>;
  const ThirdPartyIntegration = () => (
    <div>Third-party Integration Content</div>
  );
  const ApiAccess = () => <div>API Access Content</div>;
  const EmailAndInApp = () => <div>Email and In-app Notifications Content</div>;
  const CustomAlerts = () => <div>Custom Alerts Content</div>;

  const renderActiveMenuContent = () => {
    switch (activeMenu) {
      // General
      // case "Personal Information":
      //   return <PersonalInformation />;
      case "Default Configurations":
        return <DefaultConfigurations />;
      case "Theme Settings":
        return <ThemeSettings />;
      // Schedules
      case "Display Preferences":
        return <DisplayPreferences />;
      case "Notifications & Actions":
        return <NotificationsAndActions />;
      // Billing & Payment
      case "Invoice":
        return <Invoice />;
      case "Subscription Management":
        return <SubscriptionManagement />;
      case "Payment Gateway":
        return <PaymentGateway />;
      // Privacy & Security
      case "Two-factor Authentication":
        return <TwoFactorAuthentication />;
      case "Data Encryption":
        return <DataEncryption />;
      // User Permissions
      case "Settings":
      case "Team":
        return (
          <UserPermissions
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      // Integration
      case "Third-party":
        return <ThirdPartyIntegration />;
      case "API Access":
        return <ApiAccess />;
      // Notification
      case "Email and In-app":
        return <EmailAndInApp />;
      case "Custom Alerts":
        return <CustomAlerts />;
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div className="flex">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 py-4">{renderActiveMenuContent()}</div>
    </div>
  );
};

export default FrontendConfig;
