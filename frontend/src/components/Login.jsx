import React, { useState } from "react";

const Login = ({ logIn }) => {
  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("test123");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}/api/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();

      if (data.success) {
        logIn(data.userID);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log("Error while logging in", error);
    }
  };

  return (
    <div className="flex flex-col m-auto w-full items-center">
      <h2 className="mb-4 text-2xl">Login</h2>
      <div className="flex">
        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="username">Username:</label>
            <input
              className="input"
              placeholder="username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="">
            <label htmlFor="password">Password:</label>
            <input
              className="input"
              placeholder="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="">{error.message}</p>}
          <button className="btn btn-success" type="submit">
            Login
          </button>
          <br />
          {error && <span className="text-warning">{error}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
