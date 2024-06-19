import React, { useEffect, useState } from 'react';
import {faTrash,faEdit} from  "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../css/adminpage.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

Modal.setAppElement(document.body);




function Adminpage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingTourName, setDeletingTourName] = useState('');
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);
  const [userData, setuserData] = useState([]);
  const [tourData, settourData] = useState([]);

  useEffect(() => {
    fetchData(SetIsLoggedIn);
    fetchUserData(setuserData);
    fetchTourData(settourData);
  }, []);

  async function fetchData(SetIsLoggedIn) {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch('http://localhost:5000/api/private/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token
        }),
      });
      const data = await response.json()
      // console.log(data)
      if (response.ok) {
        SetIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
    async function fetchUserData(setuserData) {
      try {
        const response = await fetch('http://localhost:5000/admin/allUsers', {
          method: 'GET',
        });
        const data = await response.json();
        setuserData(data.user);
      } catch (error) {
        console.log(error)
      }
    }
  
    async function fetchTourData(settourData) {
      try {
        const response = await fetch('http://localhost:5000/admin/allTours', {
          method: 'GET',
        });
        const data = await response.json();
        settourData(data.tour);
      } catch (error) {
        console.log(error)
      }
    }
  
  
  
  const handleLogout = () => {
     
      localStorage.removeItem('jwtToken');
      
      window.location.href = '/login';
    };
  
   
  
    async function deleteTour(tourName) {
      try {
        openModal();
      } catch (error) {
        console.log(error);
      }
    }
  
    async function confirmDeleteTour() {
      try {
        const closeModal = () => setIsModalOpen(false); // Define closeModal as a closure here
        closeModal(); // Close the modal before proceeding with the deletion
  
        const response = await fetch("http://localhost:5000/admin/deleteTour", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: deletingTourName,
          }),
        });
  
        const data = await response.json();
        window.location.href = '/adminpage';
      } catch (error) {
        console.log(error);
      }
    }
  
    function addTour() {
      window.location.href = '/adminpage/addtour'
    }
  
    async function updateTour(tourName){
      localStorage.setItem("tourName", tourName); 
      window.location.href = `adminpage/updatetour`
    }
  
    async function showRegistrations(tourName){
      localStorage.setItem("tourName",tourName);
      window.location.href = 'adminpage/tourreg'
    }
  
    function openModal() {
      setIsModalOpen(true);
    }
  
    function closeModal() {
      setIsModalOpen(false);
    }
  

  return (
    <div className='container'>
      {IsLoggedIn ? (
        <><h1>Welcome to the admin's home page</h1>
        {/* <table className='user-table'>
          <tbody>
          <tr>  
            <th>Name</th>
            <th>Email</th>
            <th>UserType</th>
          
          </tr>
          {userData.map(i=>{
            return(
            <tr key={i._id}>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>{i.userType}</td>
              
            </tr>
            )
          })}
          </tbody>
        </table> */}
        <br />
          <table className='tour-table'>
            <tbody>
            <tr>  
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Delete</th>
            <th>Update</th>
            <th>Registration</th>
          </tr>
          {tourData.map(i=>{
            return(
            <tr key={i._id}>
              <td>{i.name}</td>
              <td>{i.description}</td>
              <td>{i.price}</td>
              <td>{i.duration}</td>
              <td>
                <FontAwesomeIcon icon = {faTrash } onClick={()=>{setDeletingTourName(i.name);deleteTour(i.name)}}/>
              </td>
              <td>
                <FontAwesomeIcon icon = {faEdit } onClick={()=>updateTour(i.name)}/>
              </td>
              <td><button onClick={()=>showRegistrations(i.name)}>Show Registrations</button></td>
            </tr>
            )
          })}
            </tbody>
          </table>
        <button className='add-tour-btn' onClick={addTour}>Add a new tour</button>


        <button onClick={handleLogout}>Logout</button>

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
              <p>Are you sure you want to delete the tour {deletingTourName}?</p>
              <div style={{ display: "flex", marginTop: "20px" }}>
                <button onClick={confirmDeleteTour} style={{ marginRight: "10px" }}>
                  Confirm
                </button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </Modal>
        
        
        
        </>
      
        
        
      ) : (
        <h1>Invalid access, please login again</h1>
      )}
    </div>
  );
}

export default Adminpage;
