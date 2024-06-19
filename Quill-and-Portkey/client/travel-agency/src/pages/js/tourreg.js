import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import "../css/tourreg.css";

Modal.setAppElement(document.body);

function TourRegistrations() {
  const tourName = localStorage.getItem("tourName");
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removingUserEmail, setRemovingUserEmail] = useState("");
  const [addingUserEmail, setAddingUserEmail] = useState("");

  useEffect(() => {
    fetchData();
    fetchTourReg();
  }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch("http://localhost:5000/api/private/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        SetIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTourReg() {
    try {
      const response = await fetch("http://localhost:5000/admin/tourreg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tourname: tourName,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setUsersData(data.data);
      } else if (response.status === 404) {
        // Handle 404 not found
      } else {
        // Handle other error statuses
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeTourUser(useremail) {
    setRemovingUserEmail(useremail);
    setIsModalOpen(true);
  }

  async function handleRemoveUser() {
    try {
      setIsModalOpen(false); // Close the modal before proceeding with the removal

      // Perform the removal logic here
      if (removingUserEmail) {
        const response = await fetch("http://localhost:5000/admin/removetouruser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            useremail: removingUserEmail,
            tourname: tourName,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("User removed successfully", {
            position: "top-center",
            autoClose: 5000,
          });
          // Refresh the user data
          fetchTourReg();
        } else {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 5000,
          });
        }
      }
      setRemovingUserEmail(""); // Reset the email after removal
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddUser() {
    try {
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function addUser() {
    try {
      setIsModalOpen(false); // Close the modal before proceeding with the addition

      const response = await fetch("http://localhost:5000/admin/findreguser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useremail: addingUserEmail,
        }),
      });

      const data = await response.json();

      if (data.status !== 200) {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 5000,
        });
        return;
      }

      const addUserResponse = await fetch("http://localhost:5000/admin/addtouruser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useremail: addingUserEmail,
          tourname: tourName,
        }),
      });

      const addUserData = await addUserResponse.json();

      if (addUserData.status === 200) {
        toast.success("Added User Successfully", {
          position: "top-center",
          autoClose: 5000,
        });
        // Refresh the user data
        fetchTourReg();
      } else if (addUserData.status === 409) {
        toast.error(addUserData.message, {
          position: "top-center",
          autoClose: 5000,
        });
      } else {
        console.log(addUserData.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="container">
      {IsLoggedIn ? (
        <>
          <h1>{tourName}</h1>
          <br />
          {usersData && usersData.length > 0 ? (
            <table>
              <tbody>
                <tr>
                  <th>User</th>
                  <th>Remove user</th>
                </tr>
                {usersData.map((i) => (
                  <tr key={i._id}>
                    <td>{i.useremail}</td>
                    <td>
                      <button onClick={() => removeTourUser(i.useremail)}>
                        Remove User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-registrations">No registrations yet</p>
          )}
          <br />
          <button className="add-user-btn" onClick={handleAddUser}>
            Add User
          </button>

          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.6)",
              },
              content: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "300px",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              },
            }}
          >
            <div>
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={closeModal}
              >
                &times;
              </span>
              {removingUserEmail ? (
                <>
                  <p>Are you sure you want to remove {removingUserEmail}?</p>
                  <div style={{ display: "flex", marginTop: "20px" }}>
                    <button onClick={handleRemoveUser} style={{ marginRight: "10px" }}>
                      Confirm
                    </button>
                    <button onClick={closeModal}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p>Enter user email:</p>
                  <input
                    type="text"
                    value={addingUserEmail}
                    onChange={(e) => setAddingUserEmail(e.target.value)}
                  />
                  <div style={{ display: "flex", marginTop: "20px" }}>
                    <button onClick={addUser} style={{ marginRight: "10px" }}>
                      Add User
                    </button>
                    <button onClick={closeModal}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          </Modal>
        </>
      ) : (
        <h1>Invalid access, please login again</h1>
      )}
    </div>
  );
}

export default TourRegistrations;
