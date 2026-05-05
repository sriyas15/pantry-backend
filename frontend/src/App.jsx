import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const API = "https://pantry-backend-ndoy.onrender.com/api/notes"

function App() {

  const [title, setTitle] = useState("")
  const [things, setThings] = useState([])

  const getThings = async () => {
  try {
    const res = await axios.get(API)
    setThings(res.data)
  } catch (err) {
    showToast("Failed to fetch items")
  }
}
  const addThing = async () => {

    try {
      if (!title) return toast("Enter item");
      await axios.post(API, { title })

      setTitle("");
      toast.success(`Added`);
      getThings();

    } catch (error) {
      toast.error("Adding failed",error);
    }
  }

  const deleteThing = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      toast.success("Item Deleted");
      getThings();
    } catch (error) {
      toast.error("Deletion Failed",error);
    }
  }

  const updateThing = async (id, currentTitle) => {

    try {
      const newTitle = prompt("Update item", currentTitle)

      if (!newTitle) return

      await axios.put(`${API}/${id}`, { title: newTitle })
      toast.success("Item updated");
      getThings();
    } catch (error) {
      toast.error("Update failed",error);
    }
  }

  useEffect(() => {
    getThings()
  }, [])

  return (
    <div>

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Pantry Manager</span>
        </div>
      </nav>

      <div className="container mt-5">

        {/* Input */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter item"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            className="btn btn-primary"
            onClick={addThing}
          >
            Add
          </button>
        </div>

        {/* Items */}
        <ul className="list-group">

          {things.map(item => (
            <li key={item._id}
              className="list-group-item d-flex justify-content-between align-items-center">

              <span>{item.title}</span>

              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => updateThing(item._id, item.title)}
                >
                  Update
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteThing(item._id)}
                >
                  Delete
                </button>
              </div>

            </li>
          ))}

        </ul>

      </div>

    </div>
  )
}

export default App