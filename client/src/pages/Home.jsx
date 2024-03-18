/* eslint-disable no-unused-vars */
import React from 'react'
import {useSelector} from 'react-redux';


export default function Home() {
  const {currentUser,loading,error}=useSelector((state)=> state.user)
  console.log(currentUser)
  console.log(currentUser?.isAdmin)
  return (
    <div>
      
    </div>
  )
}
