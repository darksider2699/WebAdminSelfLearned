import MUIDataTable from "mui-datatables";
import Box from "@material-ui/core/Box";
import React, { useState, useEffect } from "react";
import { responsiveFontSizes, createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllMedicalInformation } from "../../store/slices/medicalUserSlice";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./styles.css";
import moment from "moment";

const Account = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMedicalInformation());
  },[]);
  const listAccount =
    useSelector(
      (state) =>
        state.checkinListStore.medicalUserList.current
          ?.medicalUserInformationList
    ) || [];
  const options = {
    filter: true,
    selectableRows: "none",
    print: false,
    onRowClick: null,
    jumpToPage: true,
    searchPlaceholder: "Search",
    download: true,
    print: false,
    downloadOptions: { filename: `List employees` },
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      console.log({ rowData, rowMeta });
      return (
        <React.Fragment>
          <tr>
            <td colSpan={6}>
              <TableContainer component={Paper}>
                <Table style={{ minWidth: "650" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Take this shot on</TableCell>
                      <TableCell>Vaccine Type</TableCell>
                    </TableRow>
                  </TableHead>
                  { <TableBody>
                    {listAccount[rowMeta.dataIndex]?.vaccineInformations.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {moment(row.date).format("DD MMM YYYY")}
                        </TableCell>
                        <TableCell >
                          {row.type.name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody> }
                </Table>
              </TableContainer>
            </td>
          </tr>
        </React.Fragment>
      );
    },
    //count, // Use total number of items
  };
  const rows = listAccount?.map((index) => index.vaccineInformation);
  const columns = [
    {
      name: "id",
      label: "Id User",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "username",
      label: "Username",
      options: {
        filter: true,
        sort: true,
      },
    },
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
      name: "companyEmail",
      label: "Company Email",
      options: {
        filter: true,
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
      name: "status",
      label: "Covid Status",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div
              className={`${
                value === 0 ? "red" : value === 1 ? "yellow" : "green"
              }`}
            >
              {value === 0 ? (
                <div>F0</div>
              ) : value === 1 ? (
                <div>F1</div>
              ) : (
                <div>Safe</div>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "vaccineShot",
      label: "Vaccine ",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          console.log("BB",value)
          return (
            <div
              className={`${
                value === 0 ? "red" : value === 1 ? "yellow" : "green"
              }`}
            >
              <div>{`${value} shot(s)`}</div>
            </div>
          );
        },
      },
    },
  ];
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
        username: value.user.account.username,
        name: value.user.firstName + " " + value.user.lastName,
        role: value.user.account.roles.map((index) => index.name).join("\n"),
        companyEmail: value.user.companyUserInformation.companyEmail,
        status: value.status,
        vaccineShot: value.vaccineInformations?.length,
        jobTitle: value.user.companyUserInformation.jobTitles[0]?.name
          ? convertJobTitle(value.user.companyUserInformation.jobTitles)
          : "--",
        department: value.user.companyUserInformation.department?.name
          ? value.user.companyUserInformation.department?.name
          : "--",
      };
    });
    return result;
  };
  console.log("AA",convertDataForTableUser(listAccount))
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <Box marginLeft={0}>
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"List account in system"}
          data={convertDataForTableUser(listAccount)}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </Box>
  );
};
export default Account;
