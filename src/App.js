import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { db } from "./Firebase";
import "./App.css";

function App() {
  const [update, setupdate] = useState(false);
  ////////////////////////////////////////////  Add  ///////////////////////////////////////////
  const [state, setstate] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (update) {
      db.collection("users")
      .doc(updateId)
      .update(state)
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating the document: ", error);
      });

      setupdate(false);
    } else {
      await db.collection("/users").add(state);
      setstate({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  ////////////////////////////////////////////  Read  ///////////////////////////////////////////
  const [data, setdata] = useState([]);
  useEffect(() => {
    const hospitals = [];
    db.collection("users")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((items) => {
          let currentID = items.id;
          let appObj = { ...items.data(), ["id"]: currentID };
          hospitals.push(appObj);
        });
        setdata(hospitals);
      });
  }, [data]);

  /////////////////////////////////////  update  /////////////////////////////////////////////
  const [updateId, setupdateId] = useState("")
  const updateHandler = (items) => {
    setupdate(true);
    setstate(items);
    setupdateId(items.id)
  };

  /////////////////////////////////////  delete  /////////////////////////////////////////////

  const deleteHandler = (id) => {
    db.collection("users")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="App">
      <Grid container spacing={5} direction="row" justify="center">
        <Grid item xs={4}>
          <Typography>Information</Typography>
          <TextField
            className="filled-full-width"
            label="Name"
            style={{ margin: 8 }}
            placeholder="Enter your full name"
            fullWidth
            margin="normal"
            variant="filled"
            type="text"
            value={state.name}
            name="name"
            onChange={handleChange}
          />
          <TextField
            className="filled-full-width"
            label="Email"
            style={{ margin: 8 }}
            placeholder="Enter your email address"
            fullWidth
            margin="normal"
            variant="filled"
            type="text"
            value={state.email}
            name="email"
            onChange={handleChange}
          />
          <TextField
            className="filled-full-width"
            label="Password"
            style={{ margin: 8 }}
            placeholder="Enter your full password"
            fullWidth
            margin="normal"
            variant="filled"
            type="text"
            value={state.password}
            name="password"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={submitHandler}
          >
            ADD
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={5} direction="row" alignItems="center">
        <Grid item md={12}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Modify</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {data.map((items, index) => {
                return (
                  <tr key={index}>
                    <td>{items.name}</td>
                    <td>{items.email}</td>
                    <td>{items.password}</td>
                    <td>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SaveIcon />}
                        onClick={() => updateHandler(items)}
                      >
                        Update
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteHandler(items.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
