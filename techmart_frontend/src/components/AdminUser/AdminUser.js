import React, { useState } from "react";
import "./AdminUser.scss";
import TimeComponent from "../TimeCompnent/TimeComponent";
import TableComponentProduct from "../TableComponentProduct/TableComponentProduct";
import AddUser from "../AddUser/AddUser";
import TableComponentUser from "../TableComponentProduct/TableComponentUser";

const AdminUser = () => {
  const [showAddUser, setShowAddUser] = useState(false);

  const handleAddUserClick = () => {
    setShowAddUser(true);
  };

  const handleBackToTable = () => {
    setShowAddUser(false);
  };

  return (
    <div className="Admin_user px-3 py-3 ">
      {!showAddUser && (
        <>
          <div className="Admin_user-title d-flex justify-content-between">
            <h5>Danh sách sản phẩm</h5>
            <TimeComponent />
          </div>
          <div className="Admin_user_main">
            <div className="Admin_user_main-button-list d-flex px-1 py-3">
              <div
                className="Admin_user_main-button align-items-center text-center py-1 px-2"
                onClick={handleAddUserClick}
              >
                <i className="fa-solid fa-plus"></i>
                <span>Thêm người dùng</span>
              </div>
            </div>

            <div className="px-3">
              <TableComponentUser />
            </div>
          </div>
        </>
      )}
      {showAddUser && (
        <div>
          <AddUser />
          <button
            style={{ marginTop: 10 }}
            className="BackToTable"
            onClick={handleBackToTable}
          >
            Trở về
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUser;
