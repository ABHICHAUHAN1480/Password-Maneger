import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Footer from './components/Footer'
import copy from './assets/copy.svg';
import edit from './assets/edit.svg';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const notify = () => toast("copy to clipboard!");
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordarray, setpasswordarray] = useState([])

   const getpassword=async()=>{
    let res=await fetch("http://localhost:3000/")
    let passwords = await res.json();
    console.log(passwords);
    setpasswordarray(passwords);
    
   }


  useEffect(() => {
    getpassword();
    }
  , [])


  const copytext = (text) => {
    navigator.clipboard.writeText(text);
    toast(`Copied "${text}" to clipboard!`);
  }


  const SavePassword = async() => {
    if (form.password.length < 3) {
      toast(`Password should be greater than 3 words`);
    }
    else if (form.username.length <= 0) {
      toast(`username cannot be empty`);
    }
    else if (form.site.length <= 0) {
      toast(`Password platform  cannot be empty`);
    }
    else {
      setpasswordarray([...passwordarray, { ...form, id: uuidv4() }])

    await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({ id:form.id})})
      let res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( { ...form, id: uuidv4() })
      });      // localStorage.setItem("passwords", JSON.stringify([...passwordarray, { ...form, id: uuidv4() }]))
      toast(`Password added successfully`);
      setform({ site: "", username: "", password: "" })
    }
  }
  const deletepassword = async(id) => {
    let c = confirm("do you really want to delete that password ");
    if (c) {
      setpasswordarray(passwordarray.filter(item => item.id != id));
      let res=await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({  id})})

      // localStorage.setItem("passwords", JSON.stringify(passwordarray.filter(item => item.id != id)))
      toast(`Password deleted`);
    }
  }
  const editpassword = (id) => {
    setform({...passwordarray.filter(item => item.id === id)[0],id:id})
    setpasswordarray(passwordarray.filter(item => item.id != id));

  }



  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer
        autoClose={3000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        closeOnClick
      />

      <Navbar />
      <div id="div1">
        <div id="div2">
          <span id="s4">Manage your </span>
          <span id="s5">passwords  </span>
          <span id="s6"> with </span>
          <span id="s2" >Pass</span>
          <span id="s3">anger</span>
        </div>

     
        <div id="email">
          <input value={form.site} name="site" onChange={handleChange} id="email1" type="text" placeholder='Password platform ' />
        </div>
        <div id="user">

          <input value={form.username} name="username" onChange={handleChange} id="i1" type="text" placeholder='your uername' />
          <input value={form.password} name="password" onChange={handleChange} id="i2" type="password" placeholder='your password' />
          <button  onClick={SavePassword} className="btn"><lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" >
          </lord-icon>ADD</button>
       
        </div>
        <h2>Your <span id="s10">Passwords</span></h2>
        {passwordarray.length === 0 && <div id="div3">no password to show, you have to add passwords first</div>}
        {passwordarray.length != 0 &&
         <table id="t">
         <thead id="th">
           <tr>
             <th>Website</th>
             <th>Username</th>
             <th>Password</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           {passwordarray.map((item, index) => (
             <tr key={index}>
               <td className='td1'><div className='text-wrapper'>
                 <span className='item'>{item.site}</span>
                 <span className='copy'>
                   <img onClick={() => copytext(item.site)} src={copy} alt="Copy Site" />
                 </span>
                 </div>
               </td>
               <td className='td2'><div className='text-wrapper'>
                 <span className='item'>{item.username}</span>
                 <span className='copy'>
                   <img onClick={() => copytext(item.username)} src={copy} alt="Copy Username" />
                 </span>
                 </div>
               </td>
               <td id="pass" className='td3'><div className='text-wrapper'>
                 <span className='item'>{item.password}</span>
                 <span className='copy'>
                   <img onClick={() => copytext(item.password)} src={copy} alt="Copy Password" />
                 </span>
                 </div>
               </td>
               <td className="del">
                 <button onClick={() => editpassword(item.id)} className="delete">
                   <img src={edit} alt="Edit" />
                 </button>
                 <button onClick={() => deletepassword(item.id)} className="delete">
                   <lord-icon
                     src="https://cdn.lordicon.com/skkahier.json"
                     trigger="hover"
                     style={{ width: "20px", height: "20px" }}
                   />
                 </button>
                 
               </td>
             </tr>
           ))}
         </tbody>
       </table>
       
        }

      </div>
      <div><Footer /></div>
    </>
  )
}

export default App
