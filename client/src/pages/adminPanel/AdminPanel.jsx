import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Table from "./table/Table";
import "./adminPanel.css";

const AdminPanel = () => {
  return (
    <div className="adminPanel_container">
      <Topbar />
      <Table />
    </div>
  );
};

export default React.memo(AdminPanel);
