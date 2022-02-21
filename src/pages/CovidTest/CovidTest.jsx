import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core/";
import TestResult from "./TestResult/TestResult";
import Button from "@mui/material/Button";
import moment from "moment";
import "./styles.css";
import MUIDataTable from "mui-datatables";
import Papa from "papaparse";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import {
  getAllTestResult,
  getTestResultByDate,
  addListTestResult,
} from "../../store/slices/covidTestSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { flexbox, padding } from "@mui/system";
import YesNoModal from "../../components/YesNoModal";
import {createNewCase } from "../../store/slices/covidCaseSlice";

const CovidTest = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [listTestAdded, setListTestAdded] = useState();
  const [isCreateNewCase, setIsCreateNewCase] = useState();

  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [idUserToCreateCase,setIdUserToCreateCase] = useState();
  const allTestResult =
    useSelector((state) => state.covidTestStore.testResultList.current) || [];

  const testResultByDateList =
    useSelector((state) => state.covidTestStore.testResultByDateList.current) ||
    [];

  useEffect(() => {
    dispatch(getAllTestResult());
  }, []);

  useEffect(() => {
    dispatch(getTestResultByDate({ dateRecord: dateSelected }));
  }, [dateSelected]);

  let id = 0;
  const [isShowTable, setIsShowTable] = useState(false);
  const handleWarningClick = (param) =>{
    console.log("Param", param.target);
    setIdUserToCreateCase(param.target.value);
    setIsCreateNewCase(true);
  }
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "department",
      label: "Department",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "isNegative",
      label: "Negative?",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className={`${value === true ? "green" : "red"}`}>
              {value === true ? (
                <i className="bx bx-check-circle"></i>
              ) : (
                <i className="bx bx-x-circle"></i>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "warning",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value,tableMetaData) => {
          return (
            <Button variant="outlined" color="error" disabled = {value.isNegative} onClick = {handleWarningClick} value={value.id}>
              Warn
            </Button>
          );
        },
      },
    },
  ];
  const options = {
    filter: true,
    selectableRows: "none",
    onRowClick: null,
    jumpToPage: true,
    downloadOptions: { filename: `Test_Result_On_${dateSelected}` },
    searchPlaceholder: "Search",
    //count, // Use total number of items
  };
  const convertJobTitle = (input) => {
    let result = input?.map((value, index) => {
      return value.name + " - level: " + value.level;
    });
    return result.map((item, index) => (index ? ", " : "") + item).join("");
  };
  const convertDataForTable = (input) => {
    let result = input?.map((value, index) => {
      return {
        name:
          value.medicalUserInformation.user.firstName +
          " " +
          value.medicalUserInformation.user.firstName,
        role: convertJobTitle(
          value.medicalUserInformation.user.companyUserInformation.jobTitles
        ),
        department:
          value.medicalUserInformation.user.companyUserInformation.department
            ?.name,
        phoneNumber: value.medicalUserInformation.user.phoneNumber,
        email:
          value.medicalUserInformation.user.companyUserInformation.companyEmail,
        isNegative: !value.positive,
        warning: {
          isNegative: !value.positive,
          id: value.medicalUserInformation.id
        }
      };
    });
    return result;
  };
  const onClickRow = (value) => {
    if (isShowTable) {
      if (dateSelected === value) {
        setIsShowTable(false);
      } else {
        setDateSelected(value);
      }
    } else {
      setIsShowTable(true);
      setDateSelected(value);
    }
  };
  const handleFileUpload = (e) => {
    console.log("eeeeeeeee", e.target.files.length);
    if (e.target.files.length > 0) {
      const files = e.target.files;
      console.log(files);
      if (files) {
        console.log(files[0]);
        Papa.parse(files[0], {
          complete: function (results) {
            console.log("Finished:", results.data);
            let listData = results.data;
            let dateRecord = listData.shift();
            listData.pop();
            console.log({ dateRecord, listData });
            setListTestAdded([
              ...listData.map((index) => {
                return {
                  dateRecord: moment(new Date(dateRecord[0])).format(
                    "YYYY-MM-DD"
                  ),
                  idUser: index[0],
                  isPositive: index[1] == 0 ? false : true,
                };
              }),
            ]);
          },
        });
      }
    }
  };
  const handleSubmitFile = async () => {
    if (listTestAdded === undefined) {
      toast("Nothing to add!");
      return;
    }
    await dispatch(
      addListTestResult({
        listTestAdded,
        cb: () => {
          dispatch(getAllTestResult());
          setTimeout(toast("Add list test result successfully!"), 3000);
        },
      })
    );
  };
const handleConfirmAddNewCase = async() => {
  await dispatch(
    createNewCase({
      id: idUserToCreateCase,
      covidStatus: 0,
      dateRecord: moment(new Date()).format("YYYY-MM-DD"),
      cb: () => {
      },
    })
  );
  setIsCreateNewCase(false)
}
  console.log("LIST DATA ADDED: ", listTestAdded);
  return (
    <Box display={"block"}>
      <div className="submit-area">
        <span className="submit-text">Add new test result list:</span>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileUpload}
        />
        
      </div>
      <div>
      <button className="submit-button" onClick={handleSubmitFile}>Submit</button>
        <ToastContainer />
      </div>
      <Box style={{ height: "18vw", overflowY: "scroll", width: "80%" }}>
        {allTestResult?.map((index) => (
          <TestResult
            key={id++}
            onClickRow={onClickRow}
            numberOfNegative={index.negative}
            date={moment(new Date(index.dateRecord)).format("YYYY-MM-DD")}
            total={index.total}
          ></TestResult>
        ))}
      </Box>

      <Box
        position={"relative"}
        marginTop={4}
        display={isShowTable ? "block" : "none"}
      >
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={`Test Result on ${dateSelected}`}
            data={convertDataForTable(testResultByDateList)}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </Box>
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
    </Box>
  );
};

export default CovidTest;
