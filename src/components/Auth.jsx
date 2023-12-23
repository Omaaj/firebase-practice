import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, googleProvider } from '../config/FirebaseConfig'

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user
      }).catch(error => {
        console.log(error.message);
      })
    } catch (error) {
        console.log(error)
    } 
  }

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      .then(userCredential => {
        const user = userCredential.user
      }).catch(error => {
        console.log(error.message);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder='email' 
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick}>Sign In</button>
      <button onClick={logout}>Logout</button>
      <br />
      <hr />
      <button onClick={handleGoogle}>Sign In with Google</button>
    </div>
  )
}
