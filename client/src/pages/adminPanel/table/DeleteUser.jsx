import React, { useCallback, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../config";
import { setLogOut } from "../../../store/action";

const DeleteUser = ({ currentUser, setUsers, inputs_ref, users }) => {
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);

  // delete user
  const deleteHandler = useCallback(async () => {
    let usersId = [];
    inputs_ref.current.forEach((input, index) => {
      if (input.checked) {
        usersId.push(users[index]._id);
      }
    });
    try {
      const res = await axiosInstance.post(`users/${currentUser._id}`, {
        usersId: usersId,
      });
      if (res.data) {
        if (res.data === "noData") {
          setLogOut();
          localStorage.removeItem("user");
          navigate("/login");
        } else {
          res.data.forEach((user) => {
            if (user._id === currentUser._id) {
              setLogOut();
              localStorage.removeItem("user");
              navigate("/login");
            }
          });
          setDeleteModal(false);
          setUsers((prev) => {
            return prev.filter((user) => {
              return res.data.find((u) => u._id !== user._id);
            });
          });
        }
      } else {
        navigate("/blocked");
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentUser._id, inputs_ref, navigate, setUsers, users]);

  return (
    <>
      <button
        className="btn btn-secondary d-flex align-items-center"
        onClick={() => setDeleteModal(true)}
      >
        <AiOutlineDelete />
        Delete
      </button>

      {deleteModal && (
        <div className="delete_user_modal_container">
          <div className="delete_user_modal_wrapper">
            <span>Are you sure you want to delete this user?</span>
            <div className="delete_user_btns">
              <button type="button" onClick={() => setDeleteModal(false)}>
                Cancel
              </button>
              <button type="button" onClick={deleteHandler}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(DeleteUser);
