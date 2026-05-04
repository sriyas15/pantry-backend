import { Toast } from "bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const API = "https://pantry-backend-ndoy.onrender.com/api/notes"

function App() {

  const [title, setTitle] = useState("")
  const [things, setThings] = useState([])
  const [toastMessage, setToastMessage] = useState("")

  const showToast = (msg) => {

  setToastMessage(msg);

  const toastElement = document.getElementById("liveToast");

  if (toastElement) {
    const toast = new Toast(toastElement);
    toast.show();
  }

};

  const getThings = async () => {
  try {
    const res = await axios.get(API)
    setThings(res.data)
  } catch (err) {
    showToast("Failed to fetch items")
  }
}
  const addThing = async () => {

    if (!title) return showToast("Enter item")

    await axios.post(API, { title })

    setTitle("")
    showToast("Item added")
    getThings()
  }

  const deleteThing = async (id) => {
    await axios.delete(`${API}/${id}`)
    showToast("Item deleted")
    getThings()
  }

  const updateThing = async (id, currentTitle) => {

    const newTitle = prompt("Update item", currentTitle)

    if (!newTitle) return

    await axios.put(`${API}/${id}`, { title: newTitle })

    showToast("Item updated")
    getThings()
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

      {/* Toast */}
      <div className="position-fixed bottom-0 end-0 p-3">
        <div id="liveToast" className="toast text-bg-success border-0">

          <div className="d-flex">

            <div className="toast-body">
              {toastMessage}
            </div>

            <button
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast">
            </button>

          </div>
        </div>
      </div>

    </div>
  )
}

export default App