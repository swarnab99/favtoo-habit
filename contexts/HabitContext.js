import React, { createContext, useState } from "react"

export const HabitContext = createContext()

const HabitContextProvider = props => {
  const [habits, setHabits] = useState([])

  const addHabit = async (name, description) => {
    let newHabit = {}
    newHabit.name = name
    newHabit.description = description
    setHabits([...habits, newHabit])

    return true
  }

  const updateHabit = async id => {}

  const deleteHabit = async id => {
    setHabits(habits.filter(habit => habit.id !== id))
  }

  return (
    <HabitContext.Provider
      value={{ habits, addHabit, updateHabit, deleteHabit }}
    >
      {props.children}
    </HabitContext.Provider>
  )
}

export default HabitContextProvider
