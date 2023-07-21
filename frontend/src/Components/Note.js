import React, { useRef, useState, useEffect } from "react";
import { useContext } from "react";
import alertContext from "../context/Alert/alertContext";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";

export default function Note() {
  const ncontext = useContext(noteContext);
  const acontext = useContext(alertContext);
  const { notes, updateNote, fetchNote } = ncontext;
  const { setAlert } = acontext;
  const ref = useRef(null);
  let history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNote();
    } else {
      console.log("hey");
      history("/login");
    }
  }, []);

  const [unote, setUnote] = useState({
    title: "",
    description: "",
    tag: "default",
    id: "",
  });

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const updateNote_In = (note) => {
    ref.current.click();
    setUnote({
      title: note.title,
      description: note.description,
      tag: note.tag,
      id: note._id,
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    updateNote(unote);
    showAlert("Note Updated sucessfully", "update");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        update note
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="utitle"
                    name="utitle"
                    value={unote.title}
                    aria-describedby="emailHelp"
                    onChange={(e) =>
                      setUnote({ ...unote, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="udescription"
                    name="udescription"
                    value={unote.description}
                    onChange={(e) =>
                      setUnote({ ...unote, description: e.target.value })
                    }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onUpdate}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="container">
          {notes.length === 0 && `No Notes To Display`}
        </div>
        {notes.map((element) => {
          return (
            <Noteitem
              key={element._id}
              updateNote={updateNote_In}
              note={element}
            />
          );
        })}
      </div>
    </>
  );
}
