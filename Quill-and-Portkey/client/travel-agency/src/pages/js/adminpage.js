import React, { useEffect, useState } from 'react';
import {faTrash,faEdit} from  "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../css/adminpage.css';

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

  async function deleteUser(userName,userEmail){
    try {
    if (window.confirm(`Are you sure you want to delete user ${userName}`)){
        const response = await fetch("http://localhost:5000/admin/deleteUser",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        })
        const data = await response.json();
        window.location.href = '/adminpage'
    }
    else{

    }
  } catch (error) {
      console.log(error)
  }
  }


  async function deleteTour(tourName){
    try {
    if (window.confirm(`Are you sure you want to delete tour ${tourName}`)){
        const response = await fetch("http://localhost:5000/admin/deleteTour",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: tourName,
          }),
        })
        const data = await response.json();
        window.location.href = '/adminpage'
    }
    else{

    }
  } catch (error) {
      console.log(error)
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

function Adminpage() {
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);
  const [userData, setuserData] = useState([]);
  const [tourData, settourData] = useState([]);

  useEffect(() => {
    fetchData(SetIsLoggedIn);
    fetchUserData(setuserData);
    fetchTourData(settourData);
  }, []);


  return (
    <div>
      {IsLoggedIn ? (
        <><h1>Welcome to the admin's home page</h1>
        <table style={{width:300}}>
          <tbody>
          <tr>  
            <th>Name</th>
            <th>Email</th>
            <th>UserType</th>
            <th>Delete</th>
          </tr>
          {userData.map(i=>{
            return(
            <tr key={i._id}>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>{i.userType}</td>
              <td>
                <FontAwesomeIcon icon = {faTrash } onClick={()=>deleteUser(i.name,i.email)}/>
              </td>
            </tr>
            )
          })}
          </tbody>
        </table>
        <br />
          <table>
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
                <FontAwesomeIcon icon = {faTrash } onClick={()=>deleteTour(i.name)}/>
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
        <button onClick={addTour}>Add a new tour</button>


        <button onClick={handleLogout}>Logout</button></>

        
        
      ) : (
        <h1>Invalid access, please login again</h1>
      )}
    </div>
  );
}

export default Adminpage;
