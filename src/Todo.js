// this components is responsible of showing onw todo in a row
import { ListItem, List, Button, ListItemText, Modal } from "@material-ui/core";
import { React, useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import db from "./firebase";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";

function Todo(props) {
  //state that deals with the state of the Model aka the editing section
  const [open, setOpen] = useState(false);
  //a state that deals with the value of the updated input
  const [input, setInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  //the arow function that update the todos
  const updateTodo = (event) => {
    event.preventDefault();
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {/* className={classes.paper} */}
        <EditeContainer>
          <h2 className="center" id="simple-modal-title">
            {props.todo.todo}
          </h2>
          <Form>
            <Input
              value={input}
              placeholder={props.todo.todo}
              onChange={(event) => setInput(event.target.value)}
            />
            <Btn onClick={updateTodo}>continie</Btn>
          </Form>
        </EditeContainer>
      </Modal>
      <Container>
        <List>
          <ListItem>
            {/* ↓↓ here i need to despaly a timer */}
            <ListItemText
              primary={props.todo.todo}
              secondary={"harry up boy"}
              className="center"
            />
          </ListItem>
          <BtnCon>
            <DeleteForeverIcon
              className={"trash-btn"}
              onClick={(event) =>
                db.collection("todos").doc(props.todo.id).delete()
              }
            />
            {props.time}
          </BtnCon>
          <BtnCon>
            {/* className="edit-btn" */}
            {/* <button type="button" > */}
            <EditIcon onClick={handleOpen} />
            {/* </button> */}
          </BtnCon>
          {/* delete me please */}
        </List>
      </Container>
    </>
  );
}

export default Todo;
const BtnCon = styled.div`
  cursor: pointer;
`;
const EditeContainer = styled.div`
  background-color: white;
  width: 400px;
  height: 200px;
  top: 50%;
  border-radius: 10px;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`;
const Form = styled.form`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
`;
const Container = styled.div`
  display: flex;
  border-radius: 15px;
  background-color: #cecece;
  margin: 20px;
`;
const Btn = styled.button`
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 4px;
  min-width: 64px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid #555;
`;
