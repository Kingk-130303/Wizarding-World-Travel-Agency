import React, { useEffect, useState } from "react";

function TourRegistrations() {
  const tourName = localStorage.getItem("tourName");
  const [IsLoggedIn, SetIsLoggedIn] = useState(false);
  const [usersData, setusersData] = useState([]);

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
      // console.log(data)
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
      // console.log(response.status)
      if (response.ok) {
        setusersData(data.data);
      } else if (response.status === 404) {
        alert("nope");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeTourUser(useremail) {
    try {
      if (window.confirm(`Are you sure you want to remove ${useremail}`)) {
        const response = await fetch(
          "http://localhost:5000/admin/removetouruser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              useremail: useremail,
              tourname: tourName,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) window.location.href = "/adminpage/tourreg";
        else {
          alert(data.message);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddUser() {
    try {
      let useremail = prompt("Enter user email");
      if (useremail !== null){
      // console.log(useremail)
      let response = await fetch("http://localhost:5000/admin/findreguser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useremail: useremail,
        }),
      });
  
      let data = await response.json();
  
      if (data.status !== 200) {
        alert(data.message);
        return;
      }
       response = await fetch("http://localhost:5000/admin/addtouruser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useremail: useremail,
          tourname: tourName,
        }),
      });
  
       data = await response.json();
     
    
      if (data.status === 200) {
        alert("Added User Successfully");
        window.location.href = "/adminpage/tourreg";
      }
       else if (data.status === 409) {
        // console.log("duplicate")
        alert(data.message);
      } 
      else {
        console.log(data.error);
      }
    }
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div>
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
            <p>No registrations yet</p>
          )}
          <br />
          <button onClick={() => handleAddUser()}>Add User</button>
        </>
      ) : (
        <h1>Invalid access, please login again</h1>
      )}
    </div>
  );
}

export default TourRegistrations;
