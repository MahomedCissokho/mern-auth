import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";


function SignIn() {

  const navigate = useNavigate();
  const [user, setUser] = useState({
      username: "",
      password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }
  const handleSignIn = (e) => {
    e.preventDefault();
    
    console.log(user)

    axios.post('http://localhost:6200/signin', user, { withCredentials: true })
    .then(res => {
      if(res.data.success === true)
        navigate('/home')
    })
  }
  return (
    <form onSubmit={handleSignIn}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
      <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignIn;
