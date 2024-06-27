import { useState } from "react";
import { useNavigate } from "react-router";

function SignUp() {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
    console.log(user)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user)

    fetch("http://localhost:6200/signup", {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
      }
    )
    .then(res => res.json())
    .then(data => {
      if(data.success === true)
        navigate('/signin')
    })
    .catch(err => console.log(err))

   
  }
  return (
    <form className="flex gap-5 items-center mt-10" onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button type="submit" className="px-3 py-2 text-white bg-blue-600 hover:bg-blue-500">Sign Up</button>
    </form>
  );
}

export default SignUp;
