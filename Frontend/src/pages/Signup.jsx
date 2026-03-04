import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(){

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = async () => {

    const response = await fetch("http://localhost:8080/api/auth/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await response.json();

    if(data.message){

      alert("Signup successful");

      navigate("/login");

    }else{

      alert(data.error);

    }

  }

  return(

    <div className="authContainer">

      <h1>Signup</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

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

      <button onClick={handleSignup}>
        Signup
      </button>

      <p onClick={()=>navigate("/login")}>
        Already have an account? Login
      </p>

    </div>

  )

}

export default Signup;