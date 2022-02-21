import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core/";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/styles";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMedicalInformation,
  getCheckinByDate,
} from "../../store/slices/medicalUserSlice";
import "./styles.css";
const Overview = () => {
  const dispatch = useDispatch();
  const [dateRecord, setDateRecord] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  useEffect(() => {
    dispatch(getAllMedicalInformation());
    dispatch(getCheckinByDate({ dateRecord: dateRecord }));
  }, [dateRecord]);

  const listCheckinByDate =
    useSelector((state) => state.checkinListStore.checkinList.current) || [];
  const medicalInformationDataList =
    useSelector((state) => state.checkinListStore.medicalUserList.current) ||
    [];

  const convertJobTitle = (input) => {
    let result = input?.map((value, index) => {
      return value.name + " - level: " + value.level;
    });
    return result.map((item, index) => (index ? ", " : "") + item).join("");
  };
  const convertDataForTableUser = (input) => {
    let result = input?.map((value, index) => {
      return {
        name: value.user.lastName + " " + value.user.firstName,
        jobTitle: value.user.companyUserInformation.jobTitles[0]?.name
          ? convertJobTitle(value.user.companyUserInformation.jobTitles)
          : "--",
        department: value.user.companyUserInformation.department?.name
          ? value.user.companyUserInformation.department?.name
          : "--",
        phoneNumber: value.user.phoneNumber ? value.user.phoneNumber : "--",
        email: value.user.companyUserInformation.companyEmail,
        isCheckin:
          listCheckinByDate?.filter(
            (index) => index.medicalUserInformation.id === value?.id
          ).length > 0,
        isComing:
          listCheckinByDate?.filter(
            (index) => index.medicalUserInformation.id === value?.id
          ).length > 0
            ? listCheckinByDate?.filter(
                (index) => index.medicalUserInformation.id === value?.id
              )[0].coming
            : false,
        isAllowToCome:
          listCheckinByDate?.filter(
            (index) => index.medicalUserInformation.id === value?.id
          ).length > 0
            ? listCheckinByDate?.filter(
                (index) => index.medicalUserInformation.id === value?.id
              )[0].allowTocome
            : false,
      };
    });
    return result;
  };
  const state = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Checkin Progress This Week (%)",
        backgroundColor: "#62b4ff",
        borderColor: "#62b4ff",
        borderWidth: 2,
        data: medicalInformationDataList?.checkinInWeekAmount,
      },
    ],
  };
  const handleOnChangeDate = async (event) => {
    await setDateRecord(event.target.value);
  };
  const myTheme = createTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#FF0000",
          color:"red"
        }
      }
    }
  })
  const [isShowTable, setIsShowTable] = useState(false);
  const onClickProgressBar = () => {
    setIsShowTable(!isShowTable);
  };
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 40,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      backgroundColor: "#1a90ff",
    },
  }))(LinearProgress);
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "jobTitle",
      label: "Job Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "department",
      label: "Department",
      options: {
        filter: true,
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
      name: "isCheckin",
      label: "Checkin Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className={`${value === true ? "green" : "red"}`}>
              {value === true ? (
                <i className="bx bx-check-circle"></i>
              ) : (
                <i className="bx bxs-hourglass-top"></i>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "isComing",
      label: "Is Coming?",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className={`${value === true ? "green" : "red"}`}>
              {value === true ? "Come" : value === false ? "Not Come" : "-"}
            </div>
          );
        },
      },
    },
    {
      name: "isAllowToCome",
      label: "Is Allow To Come?",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className={`${value === true ? "green" : "red"}`}>
              {value === true
                ? "Allowed"
                : value === false
                ? "Not Allowed"
                : "-"}
            </div>
          );
        },
      },
    },
  ];
  const options = {
    filter: true,
    selectableRows: "none",
    print: false,
    onRowClick: null,
    jumpToPage: true,
    searchPlaceholder: "Search",
    //count, // Use total number of items
  };
  console.log("Local storage", listCheckinByDate)
  return (
    <div>
      <Box>
        <Box style={{ position: "relative" }}>
          <Box onClick={(e) => onClickProgressBar()}>
            <BorderLinearProgress
              variant="determinate"
              value={
                (medicalInformationDataList?.finishCheckinAmount /
                  medicalInformationDataList?.numberOfUser) *
                100
              }
            />
          </Box>
          <Typography
            style={{
              position: "absolute",
              color: "black",
              top: 6,
              left: "50%",
              fontSize: "16px",
              fontWeight: "700",
              transform: "translateX(-50%)",
            }}
          >
            {`${Number(
              medicalInformationDataList?.finishCheckinAmount /
                medicalInformationDataList?.numberOfUser
            ).toLocaleString(undefined, {
              style: "percent",
              minimumFractionDigits: 2,
            })}`}
          </Typography>
        </Box>
        <Typography
          style={{
            textAlign: "center",
            color: "black",
            top: 6,
            fontSize: "16px",
            fontWeight: "700",
          }}
        >
          Checkin Progress today(%)
        </Typography>
      </Box>
      <Box marginTop={3} marginBottom={3}>
        <Box width={"90%"} paddingLeft={"10%"}>
          <Bar
            data={state}
            options={{
              title: {
                display: true,
                text: "Checkin Progress Status Recently",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
              maintainAspectRatio: true,
            }}
          />
        </Box>
      </Box>
      <Box marginLeft={0} display={isShowTable ? "block" : "none"}>
        <Box>
          <div>
            <label for="start">Date:</label>
            <input
              type="date"
              id="date_select"
              className="date_select"
              name="trip-start"
              value={dateRecord}
              onChange={handleOnChangeDate}
            />
          </div>
          <ThemeProvider theme={myTheme}>
            <MUIDataTable
              title={`Checkin List on ${dateRecord}`}
              data={convertDataForTableUser(
                medicalInformationDataList?.medicalUserInformationList
              )}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </Box>
      </Box>
    </div>
  );
};

export default Overview;
