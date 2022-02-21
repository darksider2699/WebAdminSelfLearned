import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@material-ui/core/";
import Situation from "./Situation/Situation";
import { useDispatch, useSelector } from "react-redux";
import { getAllCovidCase, createNewCase } from "../../store/slices/covidCaseSlice";
import ReactModal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { getAllMedicalInformation } from "../../store/slices/medicalUserSlice";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import moment from "moment";
import YesNoModal from "../../components/YesNoModal";

const SituationsList = () => {
  const [isAddNewCaseModalOpen, setIsAddNewCaseModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState();
  const [isCreateNewCase, setIsCreateNewCase] = useState();
  const [dateRecord, setDateRecord] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  useEffect(() => {
    dispatch(getAllCovidCase());
    dispatch(getAllMedicalInformation());
  }, []);
  const listCases =
    useSelector((state) => state.covidCaseStore.covidCaseList.current) || [];
  const medicalInformationDataList =
    useSelector((state) => state.checkinListStore.medicalUserList.current) ||
    [];
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
  const convertDataForReactSelect = (input) => {
    let result = input?.map((value, index) => {
      return {
        value: value.id,
        label: value.user.account.username,
      };
    });
    return result;
  };
  console.log(
    "AA",
    convertDataForReactSelect(
      medicalInformationDataList.medicalUserInformationList
    )
  );
  const onUpdateData = async () => {
    await dispatch(getAllCovidCase());
  };
  const handleAddNewQuestion = () => {
    setIsAddNewCaseModalOpen(true);
  };
  const hideModal = () => {
    setIsAddNewCaseModalOpen(false);
  };

  const handleOnChangeDate = async (event) => {
    await setDateRecord(event.target.value);
  };
  const handleAddNewCovidCase =  () => {
    setIsCreateNewCase(true);
  };
  const handleConfirmAddNewCase = async() => {
    await dispatch(
      createNewCase({
        id: selectedOption.value,
        covidStatus: 0,
        dateRecord: dateRecord,
        cb: () => {
          dispatch(getAllCovidCase());
        },
      })
    );
    setIsAddNewCaseModalOpen(false);
    setIsCreateNewCase(false)
  }
  console.log("Selected", selectedOption)
  return (
    <Box>
      <Box>
        <Button
          variant="outlined"
          color="primary"
          style={{ margin: "10px 0 20px 50px " }}
          name="add"
          onClick={handleAddNewQuestion}
        >
          Add New Case
        </Button>
      </Box>
      {listCases?.map((index) => {
        return <Situation patientData={index} onUpdateData={onUpdateData} key={index.id} />;
      })}
      <ReactModal
        isOpen={isAddNewCaseModalOpen}
        onRequestClose={hideModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <Box>
          <Box display={"flex"}>
            <Typography
              variant="h4"
              color="primary"
              className="add_question_header"
            >
              Add New Case
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
          </Box>
          <div>
            <label>Date:</label>
            <input
              type="date"
              id="date_select"
              className="date_select"
              name="trip-start"
              value={dateRecord}
              onChange={handleOnChangeDate}
            />
          </div>
          <Box>
            <Select
              options={convertDataForReactSelect(
                medicalInformationDataList.medicalUserInformationList
              )}
              onChange={setSelectedOption}
              value={selectedOption}
            />
          </Box>
          <Button
            variant="outlined"
            color="secondary"
            style={{ margin: "10px 0 20px 0px " }}
            name="add"
            onClick={handleAddNewCovidCase}
          >
            Submit
          </Button>
        </Box>
      </ReactModal>
      <YesNoModal
        isModalVisible={isCreateNewCase}
        hideModal={() => {}}
        title={"Confirm"}
        message={"Are you sure you want to add new Covid Case?"}
        okText={"OK"}
        cancelText={"Cancel"}
        onCancel={() => {
          setIsCreateNewCase(false);
        }}
        onOk={handleConfirmAddNewCase}
      />
      <ToastContainer/>
    </Box>
  );
};

export default SituationsList;
