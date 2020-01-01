import React, { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const GreetUser = () => {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <h1>Hi, {user ? user.displayName : "Beauty"}</h1>
    </div>
  )
}

export default GreetUser
