import MUIDataTable from "mui-datatables";
import Box from "@material-ui/core/Box";
import React, { useState, useEffect } from "react";
import { responsiveFontSizes, createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/styles";
import { getAllAccount } from "../../store/slices/accountSlice";
import { useDispatch, useSelector } from "react-redux";

const Account = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAccount());
  },[]);
  const listAccount =
    useSelector((state) => state.accountStore?.accountList.current) || [];
  const options = {
    filter: true,
    selectableRows: "none",
    print: false,
    onRowClick: null,
    jumpToPage: true,
    searchPlaceholder: "Search",
    download: false,
    print: false,
    //count, // Use total number of items
  };
  const columns = [
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
  ];
  useEffect(() => {
  }, []);
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
        username: value.username,
        name: value.user.firstName + " " + value.user.lastName,
        role: value.roles.map(index => index.name).join("\n"),
        companyEmail: value.user.companyUserInformation.companyEmail,
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
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  console.log("List account", listAccount)
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
