import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@material-ui/core/";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { editQuestion, deleteQuestion } from "../../../store/slices/questionSlice";
import YesNoModal from "../../../components/YesNoModal";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionTab = ({ question, type, onSave, onUpdateData }) => {
  console.log({ type, question });
  const idQuestion = question.id;
  const dispatch = useDispatch();
  const [listAnswer, setListAnswer] = useState([...question.answerList]);
  const [correctAnswer, setCorrectAnswer] = useState({
    id: question.rightAnswer.id,
  });
  const [isYesNoModalVisible, setIsYesNoModalVisible] = useState(false);
  const [isYesNoModalDeleteQuestionVisible, setIsYesNoModalDeleteQuestionVisible] = useState(false);
  const [labelQuestion, setLabelQuestion] = useState(question.label);
  const handleAnswerChange = (event) => {
    console.log(event.currentTarget.type);
    let type = event.currentTarget.getAttribute("name");
    switch (type) {
      case "add":
        let temp = [...listAnswer];
        temp.push({ id: listAnswer.length + 1, label: "" });
        setListAnswer([...temp]);
        break;
      case "delete":
        console.log("event.currentTarget.id", event.currentTarget.id);
        let delArr = [...listAnswer];
        let indexDelete = delArr.findIndex(
          (e) => e.id === event.currentTarget.id
        );
        delArr.splice(indexDelete, 1);
        console.log({ indexDelete, delArr });
        setListAnswer([...delArr]);
        break;
      case "save":
        setIsYesNoModalVisible(true);
        console.log({
          id: idQuestion,
          label: labelQuestion,
          answerRequest: listAnswer,
          rightAnswerPosition: listAnswer.findIndex(
            (index) => index.id === correctAnswer.id
          ),
        });
        break;
        case "delete_question":
          setIsYesNoModalDeleteQuestionVisible(true);
          break;
      default:
        break;
    }
  };
  const handleChange = (event) => {
    console.log("Change select", event);
    setCorrectAnswer({ id: event.target.value });
  };
  const handleEditTextfield = (event) => {
    console.log("Event", event.target?.value);
    if (event.target.name === "answer") {
      let tempAnswerList = listAnswer;
      console.log("tempAnswerList", tempAnswerList);
      let indexObj = tempAnswerList.findIndex(
        (index) => index.id == event.target?.id
      );
      console.log("event.target?.id", event.target.id);
      console.log("index obj", indexObj);
      console.log("tempAnswerList[indexObj]", tempAnswerList[indexObj].label);
      tempAnswerList[indexObj] = {
        id: tempAnswerList[indexObj].id,
        label: event.target.value,
      };
      setListAnswer([...tempAnswerList]);
    } else {
      setLabelQuestion(event.target.value);
    }
  };
  const handleConfirmDeleteQuestion = async () => {
    await dispatch(
      deleteQuestion({
        id: idQuestion,
        cb: () => {
          toast("Delete success!");
        },
      })
    );
    onUpdateData(idQuestion);
    setIsYesNoModalDeleteQuestionVisible(false);
  }
  const handleConfirmChangeQuestion = async () => {
    if (type === "update") {
      await dispatch(
        editQuestion({
          id: idQuestion,
          label: labelQuestion,
          answerRequest: listAnswer,
          rightAnswerPosition: listAnswer.findIndex(
            (index) => index.id === correctAnswer.id
          ),
          cb: () => {
          },
        })
      );
      toast("Edit question successfully!")
      setIsYesNoModalVisible(false);
    } else if (type === "add") {
      console.log("On OK",labelQuestion,
      listAnswer,
      correctAnswer.id,
      listAnswer.findIndex(
        (index) => index.id === correctAnswer.id));
      onSave(
        labelQuestion,
        listAnswer,
        listAnswer.findIndex(
          (index) => index.id === correctAnswer.id
        )
      );
    }
  };
  return (
    <Box
      key={idQuestion + "box"}
      bgcolor={"white"}
      borderRadius={10}
      marginBottom={5}
      marginLeft={5}
      boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
      justifyContent={"space-between"}
      display={"block"}
      width={"80%"}
      minWidth={"400px"}
      minHeight={"300px"}
    >
      <Box
        name="delete_question"
        type="delete_question"
        style={{
          paddingTop: "10px",
          color: "red",
          cursor: "pointer",
          float:"right",
          display: `${type === "update" ? 'block' : 'none'}`
        }}
        onClick={handleAnswerChange}
      >
        <i className="bx bxs-x-circle"></i>
      </Box>
      <TextField
        value={labelQuestion}
        fullWidth
        name="question"
        onChange={handleEditTextfield}
        multiline
        style={{ padding: "10px 10px 10px 10px" }}
        variant="outlined"
      />
      {listAnswer.map((answer) => {
        return (
          <Box key={answer.id + "answer"}>
            <Typography
              style={{ padding: "10px 10px 10px 10px" }}
            >{`Answer ${answer.id}`}</Typography>
            <Box display={"flex"}>
              <TextField
                value={answer.label}
                fullWidth
                name="answer"
                id={answer.id + ""}
                onChange={handleEditTextfield}
                style={{ padding: "10px 10px 10px 10px" }}
                variant="outlined"
              />
              <Box
                name="delete"
                id={answer.id}
                style={{
                  paddingTop: "20px",
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={handleAnswerChange}
              >
                <i className="bx bxs-x-circle"></i>
              </Box>
            </Box>
          </Box>
        );
      })}
      <Box>
        <FormControl
          style={{ marginLeft: "12px", width: "200px", marginRight: "10px" }}
        >
          <InputLabel id="demo-simple-select-label">Correct Answer</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={correctAnswer.id}
            label="CorrectAnswer"
            onChange={handleChange}
          >
            {listAnswer.map((index) => {
              return (
                <MenuItem key={index.id} value={index.id} name={index.id}>
                  {index.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Button
          variant="outlined"
          color="primary"
          style={{ margin: "10px 0 10px 10px " }}
          name="add"
          onClick={handleAnswerChange}
        >
          Add Answer
        </Button>
        <Button
          variant="outlined"
          style={{
            margin: "10px 25px 10px 10px ",
            height: "40px",
            color: "green",
          }}
          name="save"
          onClick={handleAnswerChange}
        >
          save
        </Button>
        <ToastContainer />
      </Box>
      <YesNoModal
        isModalVisible={isYesNoModalDeleteQuestionVisible}
        hideModal={() => {}}
        title={"Confirm"}
        message={"Are you sure you want to delete this question?"}
        okText={"OK"}
        cancelText={"Cancel"}
        onCancel={() => {
          setIsYesNoModalDeleteQuestionVisible(false);
        }}
        onOk={handleConfirmDeleteQuestion}
      />
      <YesNoModal
        isModalVisible={isYesNoModalVisible}
        hideModal={() => {}}
        title={"Confirm"}
        message={"Are you sure you want to change this answer?"}
        okText={"OK"}
        cancelText={"Cancel"}
        onCancel={() => {
          setIsYesNoModalVisible(false);
        }}
        onOk={handleConfirmChangeQuestion}
      />
    </Box>
  );
};

export default QuestionTab;
