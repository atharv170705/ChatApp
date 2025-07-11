import React, { useState } from 'react'
import assets from '../assets/assets'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const {login} = useContext(AuthContext);

  const onSubmitHandler = (ev) => { 
    ev.preventDefault();
    if(currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? 'signup' : 'login', {fullName, email, password, bio});
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8
    sm:justify-evenly max-sm:felx-col backdrop-blur-2xl'>
        {/* left part -- image */}
        <img src={assets.logo_big} alt="" className='w-[30vw] max-w-[250px]'/>
        {/* right-signupform */}
        <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col
        gap-6 rounded-lg shadow-lg'>
          <h2 className='font-medium text-2xl flex justify-between items-center'>
            {currState}
            {isDataSubmitted && (
              <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />
            )}
          </h2>
          {currState === "Sign up" && !isDataSubmitted && (
             <input 
             onChange={(ev) => setFullName(ev.target.value)}
            value={fullName}
             type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none
             focus:ring-2 focus:ring-indigo-500'
          placeholder='Full name' required/>
          )}
          {!isDataSubmitted && (
             <>
              <input 
                onChange={(ev) => setEmail(ev.target.value)}
                value={email}
                type="email" className='p-2 border border-gray-500 rounded-md focus:outline-none
                focus:ring-2 focus:ring-indigo-500'
                placeholder='Email' required/>
              <input 
                onChange={(ev) => setPassword(ev.target.value)}
                value={password}
                type="password" className='p-2 border border-gray-500 rounded-md focus:outline-none
                focus:ring-2 focus:ring-indigo-500'
                placeholder='Password' required/>
              </>
          )}

          {currState === "Sign up" && isDataSubmitted && (
            <textarea 
            onChange={(ev) => setBio(ev.target.value)}
            value={bio}
            rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none
                focus:ring-2 focus:ring-indigo-500' placeholder='provide a short bio..'></textarea>
          )}

          <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600
          text-white rounded-md cursor-pointer'>
            {currState === "Sign up" ? "Create account" : "Login"}
          </button>

          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <input type="checkbox"/>
            <p>Agree to the terms of use & privacy policy.</p>
          </div>

          <div className='flex flex-col gap-2'>
            {currState === "Sign up" ? (
              <p className='text-sm text-gray-500 flex gap-2 justify-center'>
                <h3>Already have an account? </h3>
                <span onClick={() => {setCurrState("Login"); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span>
              </p>
            ) : (
              <p className='text-sm text-gray-500 flex gap-2 justify-center'>
                <h3>Create an account </h3>
                <span onClick={() => setCurrState("Sign up")} className='font-medium text-violet-500 cursor-pointer'>Click here</span>
              </p>
            )}
          </div>
        </form>
    </div>
  )
}

export default LoginPage