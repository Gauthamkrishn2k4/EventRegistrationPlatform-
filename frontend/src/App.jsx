import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/events/")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  const registerUser = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      }
    );

    const data = await response.json();
    alert(data.message || data.error);
  };

  const loginUser = async () => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );

    const data = await response.json();

    if (data.access) {
      alert("Login Successful");
    } else {
      alert(data.error);
    }
  };

  const registerEvent = async (eventId) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/register-event/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginData.username,
          event_id: eventId,
        }),
      }
    );

    const data = await response.json();

    alert(data.message || data.error);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fc",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e3a8a",
        }}
      >
        Event Registration Platform
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            flex: 1,
          }}
        >
          <h2>Register</h2>

          <input
            placeholder="Username"
            value={registerData.username}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                username: e.target.value,
              })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                password: e.target.value,
              })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <button
            onClick={registerUser}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            flex: 1,
          }}
        >
          <h2>Login</h2>

          <input
            placeholder="Username"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                username: e.target.value,
              })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />

          <button
            onClick={loginUser}
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </div>

      <h2>Available Events</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{event.title}</h3>

            <p>{event.description}</p>

            <p>
              <strong>Location:</strong> {event.location}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(event.date).toLocaleDateString()}
            </p>

            <button
              onClick={() => registerEvent(event.id)}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Register For Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;