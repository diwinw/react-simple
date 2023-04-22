import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8081/api/auth/login', {
  method: 'POST',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: username,
    password: password
  })
})
.then(response => response.text())
.then(data => {
  if (data == "login fail") {
    window.alert("User or password incorrect");
  } else {
    localStorage.setItem("token", data);
    window.location.href = "/package";
  }
})
.catch(error => {
  console.error(error);
})
  };

  const handleClick = () =>{
    window.location.href = "/signup";
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
        <button onClick={handleClick} >Register</button>
      </form>
    </div>
  );
}

export default LoginPage;
