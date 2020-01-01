import React, { useContext } from "react"
// import { HabitContext } from "../../contexts/HabitContext"

import CreateBtn from "./CreateBtn"
import CreateModal from "./CreateModal"

const CreateHabit = () => {
  return (
    <div>
      <CreateModal />
      <CreateBtn />
    </div>
  )
}

export default CreateHabit
