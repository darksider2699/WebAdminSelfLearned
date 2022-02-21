import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMedicalInformation,
  getCheckoutByDate,
  getCheckoutByDateAndIdUser,
} from "../../store/slices/medicalUserSlice";
import { ThemeProvider } from "@mui/styles";
import { Box } from "@material-ui/core/";
import ReactModal from "react-modal";

const Checkout = () => {
  const dispatch = useDispatch();
  const [dateRecord, setDateRecord] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [idUserToGetDetail, setIdUserToGetDetail] = useState(0);
  const [isRowClicked, setIsRowClicked] = useState(false);
  useEffect(() => {
    dispatch(getAllMedicalInformation());
    dispatch(getCheckoutByDate({ dateRecord: dateRecord }));
  }, [dateRecord]);
  const listCheckoutByDate =
    useSelector((state) => state.checkinListStore.checkoutList.current) || [];
  const medicalInformationDataList =
    useSelector((state) => state.checkinListStore.medicalUserList.current) ||
    [];
  const userCheckoutDetail =
    useSelector((state) => state.checkinListStore.userCheckoutList.current) ||
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
        id: value.id,
        name: value.user.lastName + " " + value.user.firstName,
        jobTitle: value.user.companyUserInformation.jobTitles[0]?.name
          ? convertJobTitle(value.user.companyUserInformation.jobTitles)
          : "--",
        department: value.user.companyUserInformation.department?.name
          ? value.user.companyUserInformation.department?.name
          : "--",
        phoneNumber: value.user.phoneNumber ? value.user.phoneNumber : "--",
        email: value.user.companyUserInformation.companyEmail,
        isCheckout:
          listCheckoutByDate?.filter(
            (index) => index.medicalUserInformation.id === value?.id
          ).length > 0,
      };
    });
    return result;
  };
  const converDataForUserDetailTable = (input) => {
    let result = input?.map((value, index) => {
      return {
        id: value.id,
        username: value.user.account.username,
        name: value.user.lastName + " " + value.user.firstName,
        jobTitle: value.user.companyUserInformation.jobTitles[0]?.name
          ? convertJobTitle(value.user.companyUserInformation.jobTitles)
          : "--",
        department: value.user.companyUserInformation.department?.name
          ? value.user.companyUserInformation.department?.name
          : "--",
        phoneNumber: value.user.phoneNumber ? value.user.phoneNumber : "--",
        email: value.user.companyUserInformation.companyEmail,
      };
    });
    return result;
  };

  const myTheme = createTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#FF0000",
          color: "red",
        },
      },
    },
  });
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
      name: "isCheckout",
      label: "Checkout Status",
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
  ];
  const columnsForModal = [
    {
      name: "username",
      label: "Username",
      options: {
        filter: false,
        sort: true,
      },
    },
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
  ];
  const handleRowClick = async (params, rowMeta) => {
    console.log("Row Clicked", { params, rowMeta });
    await setIdUserToGetDetail(
      medicalInformationDataList.medicalUserInformationList[rowMeta.rowIndex].id
    );
    setIsRowClicked(true);
  };
  useEffect(() => {
    dispatch(
      getCheckoutByDateAndIdUser({
        id: idUserToGetDetail,
        dateRecord: dateRecord,
      })
    );
  }, [idUserToGetDetail]);
  const customStyles = {
    content: {
      top: "40%",
      left: "30%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      marginLeft: "20%",
    },
    overlay: { zIndex: 1000 },
  };
  const hideModal = () => setIsRowClicked(false);
  const options = {
    filter: true,
    selectableRows: "none",
    print: false,
    onRowClick: null,
    jumpToPage: true,
    searchPlaceholder: "Search",
    onRowClick: handleRowClick,
    //count, // Use total number of items
  };
  const handleOnChangeDate = async (event) => {
    await setDateRecord(event.target.value);
  };
  console.log("Local storage", listCheckoutByDate)

  return (
    <Box marginLeft={0}>
      <Box>
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
        <ThemeProvider theme={myTheme}>
          <MUIDataTable
            title={`Checkout List on ${dateRecord}`}
            data={convertDataForTableUser(
              medicalInformationDataList?.medicalUserInformationList
            )}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      </Box>
      <ReactModal
        isOpen={isRowClicked}
        onRequestClose={hideModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <ThemeProvider theme={myTheme}>
          <MUIDataTable
            title={`Contact relevant on ${dateRecord}`}
            data={converDataForUserDetailTable(userCheckoutDetail[0]?.contact)}
            columns={columnsForModal}
            options={options}
          />
        </ThemeProvider>
      </ReactModal>
    </Box>
  );
};

export default Checkout;
