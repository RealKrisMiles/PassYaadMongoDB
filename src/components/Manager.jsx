import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  const getPassowrd = async() => { 
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    let passwordArray;
    setpasswordArray(passwords)
    console.log(passwords)
   }

  useEffect(() => {
    getPassowrd()
  }, [])


  const showPassword = () => {
    alert("show the password")

    console.log(ref.current.src)
    if (ref.current.src.includes("public/icons/hide.png")) {
      ref.current.src = "public/icons/eye.png"
      passwordRef.current.type = "text"
    } else {
      ref.current.src = "public/icons/hide.png"
      passwordRef.current.type = "password"
    }

  }
  const savePassword = async() => {
    if(form.site.length>3 && form.username.length >3 && form.password.length >3){
    setpasswordArray([...passwordArray,{...form, id:uuidv4()}])
    await fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-type":"application/json"},body: JSON.stringify({id: form.id})})
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form, id:uuidv4()}]))
    await fetch("http://localhost:3000/",{method:"POST",headers:{"content-type":"application/json"},body: JSON.stringify({...form, id:uuidv4()})})
    setform({ site: "", username: "", password: "" })}
    else{
      toast("min length of 3 is required")
    }
    // toast(`password saved`, {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    
    //   });
  }

  const editHandle =(id)=>{
    setform({...passwordArray.filter(item=>item.id===id)[0],id:id})
    setpasswordArray(passwordArray.filter(item=>item.id!=id))
    toast(`You are editing password`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    
      });
  }
  const deleteHandle = async(id)=>{
    const c = confirm("do you want to delete this password");

    if(c){
setpasswordArray(passwordArray.filter(item=>item.id!=id))
    // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!=id)))
    let res =await fetch("http://localhost:3000/",{method:"DELETE",headers:{"content-type":"application/json"},body: JSON.stringify({ id})})

    toast(`you have deleted the password`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    
      });
    }
    
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
   const copyText = (e)=>{
    navigator.clipboard.writeText(e)
    toast(`we have copied ${e}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    
      });
   }



  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition="Bounce"
/>
{/* Same as */}
<ToastContainer />
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className='mx-auto mycontainer'>
        <h1 className='flex justify-center text-4xl'><div className="logo font-bold  font-bold text-violet-500">
          <span className='text-violet-200'> &lt;</span>
          Pass

          <span className='text-violet-200'>Yaad / &gt; </span>

        </div></h1>
        <p className='flex justify-center text-violet-600 text-lg '>Your own local Password Manager</p>
        <div className="text-white flex flex-col p-4 mx-auto max-w-4xl">
          <input onChange={handleChange} value={form.site} className='rounded-full border border-purple-600 text-black px-4 py-1' type="text" placeholder='Enter Website URL / Name' name='site' />
          <div className="flex my-3  gap-3">
            <input onChange={handleChange} value={form.username} className='rounded-full text-sm  w-1/2  border border-purple-600  text-black px-4 py-1' type="text" placeholder='Enter Username' name="username" id="" />
            <div className="relative flex justify-center items-center">
              <input ref={passwordRef} onChange={handleChange} value={form.password} className='rounded-full w-full text-sm  border border-purple-600 text-black px-4 py-1' type="text" placeholder='Enter Password' name="password" id="" />
              <span className='absolute right-1 text-black cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={30} src="public/icons/eye.png" alt="" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='text-violet-700 flex items-center hover:text-violet-200 justify-evenly hover:bg-violet-500 w-fit gap-3 mx-auto p-3 bg-violet-300 rounded-full font-bold '>Add Password   <lord-icon
            src="https://cdn.lordicon.com/sbnjyzil.json"
            trigger="hover"
            colors="primary:#d4d1fa,secondary:#104891"

          >
          </lord-icon>
          </button>

        </div>
        <div className="password">
          <h2 className='flex justify-center font-extrabold text-2xl text-violet-300 my-2'>Your Password</h2>
          {passwordArray.length === 0 && <div className='flex justify-center font-extrabold text-4xl text-violet-500 my-2' > no passwords to show</div>}
          <table className="table-auto mx-auto  md:w-1/2  w-full overflow-hidden rounded-2xl">
            <thead className='bg-violet-400 text-white'>
              <tr>
                <th className='md:py-2'>URL</th>
                <th className='md:py-2'>Name</th>
                <th className='md:py-2'>Password</th>
                <th className='md:py-2'>Actions</th>

              </tr>
            </thead>
            <tbody className='bg-slate-100'>
              {passwordArray.map((item, index) => {
                return <tr key={index.site}>
                  <td className='md:text-center flex md:justify-between py-2 md:min-w-32'>  <a href={item.site} target='_blank' >{item.site}</a>
                  <button onClick={()=>copyText(item.site)} className='flex justify-center w-5'><lord-icon
                      src="https://cdn.lordicon.com/fjvfsqea.json"
                      trigger="hover"
                      colors="primary:#4030e8,secondary:#d4d1fa"
                     >
                    </lord-icon></button>
                  </td>
                  <td className='md:text-center py-2 md:min-w-32'>{item.username}</td>
                  <td className='md:text-center  flex md:justify-between py-2 md:min-w-32'>{item.password}
                    <button onClick={()=>copyText(item.password)} className='flex justify-center w-5'><lord-icon
                      src="https://cdn.lordicon.com/fjvfsqea.json"
                      trigger="hover"
                      colors="primary:#4030e8,secondary:#d4d1fa"
                     >
                    </lord-icon></button>
                  </td>
                  <td className='text-center py-2 md:min-w-32'>
                    <button onClick={()=>editHandle(item.id)} className='md:mx-2 '>
                    <lord-icon
    src="https://cdn.lordicon.com/exymduqj.json"
    trigger="hover"
    colors="primary:#4030e8,secondary:#d4d1fa">
</lord-icon>
                    </button>
                    <button onClick={()=>deleteHandle(item.id)}  className='md:mx-2'>
                    <lord-icon
    src="https://cdn.lordicon.com/hwjcdycb.json"
    trigger="hover"
    colors="primary:#4030e8,secondary:#d4d1fa">
</lord-icon>
                    </button>
                  </td>
                </tr>
              })}

            </tbody>
          </table>
        </div>

      </div>
    </div>
    </>
  )
}

export default Manager