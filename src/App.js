import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About"

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5050/tasks")
    const data = await res.json()
    return data
  }

  // Fetch singular task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5050/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {
    // json-server adds unique id automatically
    const res = await fetch("http://localhost:5050/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
    const newTask = await res.json()

    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    // delete from server
    await fetch(`http://localhost:5050/tasks/${id}`, { method: "DELETE" })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5050/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  onAdd={() => setShowAddTask(!showAddTask)}
                  showAdd={showAddTask}
                  showButton={true}
                />
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks To Show"
                )}
                <Footer showLink={true} />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header
                  onAdd={() => setShowAddTask(!showAddTask)}
                  showAdd={showAddTask}
                  showButton={false}
                />
                <About />
                <Footer showLink={false} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
