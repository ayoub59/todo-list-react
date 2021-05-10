import "./App.css";
import { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  //todos state
  const [todos, setTodos] = useState([]);
  //input value
  //value is the input value if you couldn't get it
  const [value, setValue] = useState("");

  //when the app loads we listen to the databas and fetch new todos when they get added/removed
  useEffect(() => {
    //useEfect fires every time the value insid the [] chnages, if the [] if empty then it will fires when the page first relaod
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        // ↓↓ this will return an array of objects
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  //this is the function that add to the todos
  const setTodo = (event) => {
    // preventDefault() prevent the page from refraching every time the button submits
    event.preventDefault();
    console.log("let's gooooo");
    db.collection("todos").add({
      todo: value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    //...todos = all the array[] without, after that add the new todoes aka value
    setTodos([...todos, value]);
    setValue(""); //clear the input fuild after submiting
  };

  return (
    <div className="App">
      <h1>todo list</h1>
      <form>
        <TextField
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="✔ add a Todo"
        />
        {/* <input /> */}
        <Button
          type="submit"
          disabled={!value}
          onClick={setTodo}
          variant="contained"
          color="primary"
        >
          add todo
        </Button>
      </form>
      {/* map over the todos and return every index of the todos aray as a todo and display it as a li   */}
      <ul className="todos-center">
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
