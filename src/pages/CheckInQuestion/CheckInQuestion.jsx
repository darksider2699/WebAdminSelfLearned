import React, { useState, useEffect } from "react";
import QuestionTab from "./QuestionTab/QuestionTab";
import { useDispatch, useSelector } from "react-redux";
import { getAllQuestion, createNewQuestion, deleteQuestion } from "../../store/slices/questionSlice";
import { Box, Button, Typography } from "@material-ui/core/";
import ReactModal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CheckInQuestion/style.css";
const CheckInQuestion = () => {
  const dispatch = useDispatch();
  const [questionToAsk, setQuestionToAsk] = useState({
    label: "Add question here",
    answerList: [
      { id: 1, label: "Answer 1" },
      { id: 2, label: "Answer 2" },
    ],
    rightAnswer: { id: 1 },
  });
  const [isAddNewQuestionModalOpen, setIsAddNewQuestionModalOpen] =
    useState(false);
  const allQuestion =
    useSelector((state) => state.questionStore.questionList.current) || [];
  useEffect(() => {
    dispatch(getAllQuestion());
  }, []);

  const onSave = async ( label, answerRequest, rightAnswerPosition ) => {
    console.log({ label, answerRequest, rightAnswerPosition });
    await dispatch(
      createNewQuestion({
        label, answerRequest, rightAnswerPosition,
        cb: () => {
          dispatch(getAllQuestion());
          toast("Add new question success!")
        },
      })
    );
    setIsAddNewQuestionModalOpen(false);
  };
  const onUpdateData = async () => {
    await dispatch(getAllQuestion());
  }
  const customStyles = {
    content: {
      top: "40%",
      left: "30%",
      right: "10%",
      bottom: "1%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      marginLeft: "20%",
    },
    overlay: { zIndex: 1000 },
  };
  const handleAddNewQuestion = () => {
    setIsAddNewQuestionModalOpen(true);
  };
  const hideModal = () => {
    setIsAddNewQuestionModalOpen(false);
  };
  console.log("Question", allQuestion);
  return (
    <Box borderRadius={10} marginBottom={5}>
      <Box>
        <Button
          variant="outlined"
          color="primary"
          style={{ margin: "10px 0 20px 50px " }}
          name="add"
          onClick={handleAddNewQuestion}
        >
          Add New Question
        </Button>
      </Box>
      {allQuestion?.map((index) => {
        return <QuestionTab question={index} key={index.id} type={"update"} onUpdateData = {onUpdateData} />;
      })}
      <ReactModal
        isOpen={isAddNewQuestionModalOpen}
        onRequestClose={hideModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <Box display={"flex"}>
          <Typography
            variant="h4"
            color="primary"
            className="add_question_header"
          >
            Add New Question
          </Typography>

          <Button
            variant="outlined"
            color="secondary"
            style={{ margin: "10px 0 20px 50px " }}
            name="add"
            onClick={hideModal}
          >
            Cancel
          </Button>
          <ToastContainer />
        </Box>
        <QuestionTab question={questionToAsk} type={"add"} onSave={onSave}  />
      </ReactModal>
    </Box>
  );
};

export default CheckInQuestion;
