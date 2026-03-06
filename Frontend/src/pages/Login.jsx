import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    const response = await fetch("https://sigmagpt-an-ai-model-backend-4egr.onrender.com/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        password: password.trim()
      })
    });

    const data = await response.json();

      if(data.token){

        localStorage.setItem("token", data.token);
        setToken(data.token);

        window.location.href = "/chat";
        // navigate("/chat");

      }else{
        alert(data.error);
      }

  }

  return(

    <div className="authContainer">

      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p onClick={()=>navigate("/signup")}>
        Don't have an account? Signup
      </p>

    </div>

  )

}

export default Login;