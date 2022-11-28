import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { TbLock, TbLockOpen } from "react-icons/tb";
import { BsCheckAll } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DecodeToken from "../../../components/DecodeToken";
import { axiosInstance } from "../../../config";
import { setLoader, setLogOut } from "../../../store/action";
import DeleteUser from "./DeleteUser";

const Table = () => {
  const state = useSelector((state) => state);
  const currentUser = DecodeToken();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const inputs_ref = useRef([]);
  const tr_refs = useRef([]);

  // get all users
  useEffect(() => {
    let isMounted = true;

    const getUsers = async () => {
      try {
        const res = await axiosInstance.get("users/get_all_users");
        if (isMounted) {
          if (res.data?.length === 0) {
            // for empty
            setLogOut();
            navigate("/login");
          } else {
            // for deleted user
            let hasUser = res.data.find((u) => u._id === currentUser._id);
            if (!hasUser) {
              setLogOut();
              localStorage.removeItem("user");
              navigate("/login");
            } else if (hasUser.isBlock) {
              navigate("/blocked");
            } else {
              // for has user
              setUsers(res.data);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();

    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // block user
  const blockUserHandler = async (userItem, isBool) => {
    try {
      setLoader(true);
      const res = await axiosInstance.patch(
        `users/${userItem._id}/${currentUser._id}`,
        {
          isBlock: isBool,
        }
      );
      setLoader(false);
      if (!res.data) {
        navigate("/blocked");
      } else {
        if (res.data.isBlock) {
          if (res.data._id === currentUser._id) {
            navigate("/blocked");
          } else {
            setUsers((prev) => {
              return prev.filter((user) => {
                if (user._id === res.data._id) {
                  user.isBlock = res.data.isBlock;
                }
                return user;
              });
            });
          }
        } else {
          setUsers((prev) => {
            return prev.filter((user) => {
              if (user._id === res.data._id) {
                user.isBlock = res.data.isBlock;
              }
              return user;
            });
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // search in input
  // const inputChangeHandler = (value) => {
  //     tr_refs.current.forEach(tr => {
  //         if (tr.querySelector('.username').textContent.toUpperCase().indexOf(value.toUpperCase()) > -1) {
  //             tr.style.display = "table-row";
  //         } else {
  //             tr.style.display = "none";
  //         }
  //     })
  // }

  // checked all input
  const changeHandler = (e) => {
    console.log(e);
    if (e.target.checked) {
      inputs_ref.current.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputs_ref.current.forEach((input) => {
        input.checked = false;
      });
    }
  };

  // block users
  const blockusers = async (isBool) => {
    let usersId = [];
    if (inputs_ref.current?.length > 0) {
      inputs_ref.current.forEach((input, index) => {
        if (input?.checked) {
          usersId.push(users[index]._id);
        }
      });
    }

    setLoader(true);

    if (usersId?.length > 0) {
      try {
        const res = await axiosInstance.patch(`users/${currentUser._id}`, {
          isBlock: isBool,
          usersId: usersId,
        });
        console.log(res.data);
        setLoader(false);
        if (!res.data) {
          navigate("/blocked");
        } else {
          res.data.forEach((user) => {
            if (user.isBlock) {
              if (user._id === currentUser._id) {
                navigate("/blocked");
              }
            }
          });
          setUsers((prev) => {
            return prev.filter((user) => {
              let resultUser = res.data.find((u) => u._id === user._id);
              if (resultUser) {
                user.isBlock = resultUser.isBlock;
              }
              return user;
            });
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="table_container">
      <div className="filter_btns">
        <div className="filter_btns_inline">
          {/* <input
            type="text"
            placeholder="Search username"
            className="form-control"
            onChange={(e) => inputChangeHandler(e.target.value)}
          /> */}
          <button
            className="btn btn-danger d-flex align-items-center"
            onClick={() => blockusers(true)}
          >
            <TbLock />
            Block
          </button>
          <button
            className="btn btn-success d-flex align-items-center"
            onClick={() => blockusers(false)}
          >
            <TbLockOpen />
            Unblock
          </button>
          <DeleteUser
            currentUser={currentUser}
            setUsers={setUsers}
            inputs_ref={inputs_ref}
            users={users}
          />
        </div>
      </div>
      <div className="table_wrapper">
        <table className="table table-striped table-hover table-responsive-sm">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="text-center ">
                <label htmlFor="inputLabel">
                  <span className="bg-primary text-white px-1 badge">
                    <BsCheckAll />
                    Select all
                  </span>
                  <input
                    type="checkbox"
                    id="inputLabel"
                    className="checkboxInput"
                    onChange={(e) => changeHandler(e)}
                    style={{ display: "none" }}
                  />
                </label>
              </th>
              <th scope="col">#ID</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Registration time</th>
              <th scope="col">Last login time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 &&
              users.map((user, index) => (
                <tr
                  key={user._id}
                  ref={(element) => (tr_refs.current[index] = element)}
                >
                  <th scope="row" className="text-center">
                    <input
                      type="checkbox"
                      ref={(element) => (inputs_ref.current[index] = element)}
                      className="checkboxInput"
                    />
                  </th>
                  <td>{index + 1}</td>
                  <td className="username">{user.username}</td>
                  <td className="username">{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                  <td>{new Date(user.lastAccessData).toLocaleString()}</td>
                  <td className="icons">
                    {user.isBlock ? (
                      <span className="bg-danger text-white px-1 badge">
                        Blocked
                      </span>
                    ) : (
                      <span className="bg-success text-white px-1 badge">
                        Active
                      </span>
                    )}
                    {/* <DeleteUser
                                        currentUser={currentUser}
                                        user={user}
                                        setUsers={setUsers}
                                    />
                                    {state?.loader ? (
                                        <div className="loader"></div>
                                    ) : (
                                        !user.isBlock ? (
                                            <TbLockOpen className="blockOpenIcon" onClick={() => blockUserHandler(user, true)} />
                                        ) : (
                                            <TbLock className="blockIcon" onClick={() => blockUserHandler(user, false)} />
                                        )
                                    )} */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default React.memo(Table);
