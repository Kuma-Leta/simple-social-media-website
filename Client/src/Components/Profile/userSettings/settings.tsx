import React, { useState } from "react";
import ManageAccounts from "./manageAccountsPH"; // Assuming this imports your ManageAccounts component
import ChangeEmail from "./changeEmail";
import { Link } from "react-router-dom";
const Settings: React.FC = () => {
  return (
    <div>
      <div className="settingsContainer">
        <Link to={"/profile/userSetting/changePassword"}>change Password</Link>
        <Link to={"/profile/userSetting/changeName"}>change Name</Link>
        <Link to={"/profile/userSetting/changeEmail"}>change Email</Link>
      </div>
      <div>
        {/* Render the ActiveComponent dynamically */}
        {/* {ActiveComponent && <ActiveComponent />} */}
      </div>
    </div>
  );
};

export default Settings;
