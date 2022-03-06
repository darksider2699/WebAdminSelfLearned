import MUIDataTable from "mui-datatables";
import { Box, Typography, Button, TextField } from "@material-ui/core/";
import React, { useState, useEffect } from "react";
import { responsiveFontSizes, createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllMedicalInformation } from "../../store/slices/medicalUserSlice";
import { getAllRole, signup } from "../../store/slices/userSlice";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ReactModal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import YesNoModal from "../../components/YesNoModal";
import "./styles.css";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import Select from "react-select";

const Account = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [isAddNewAccountModal, setIsAddNewAccountModal] = useState(false);
  const [isYesnoModal, setIsYesnoModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [submitData, setSubmitData] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(getAllMedicalInformation());
    dispatch(getAllRole());
  }, []);
  const listAccount =
    useSelector(
      (state) =>
        state.checkinListStore.medicalUserList.current
          ?.medicalUserInformationList
    ) || [];
  const listRole =
    useSelector((state) => state.userStore.roleList?.current) || [];
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
                  {
                    <TableBody>
                      {listAccount[rowMeta.dataIndex]?.vaccineInformations.map(
                        (row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {moment(row.date).format("DD MMM YYYY")}
                            </TableCell>
                            <TableCell>{row.type.name}</TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  }
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
  const customStyles = {
    content: {
      top: "40%",
      left: "30%",
      right: "10%",
      bottom: "10%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      marginLeft: "20%",
    },
    overlay: { zIndex: 1000 },
  };
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
  const handleAddNewAccount = () => {
    setIsAddNewAccountModal(true);
  };
  const hideModal = () => {
    setIsAddNewAccountModal(false);
  };
  const handleConfirmAddNewAccount = async () => {
    await dispatch(
      signup({
        submitData,
        cb: () => {
          dispatch(getAllMedicalInformation());
          toast("Add new account success!");
        },
      })
    );
    setIsYesnoModal(false);
    setIsAddNewAccountModal(false);
  };
  const onSubmit = async ({ username, password }) => {
    let roleName;
    switch (selectedOption.value) {
      case 3:
        // code block
        roleName = "admin";
        break;
      case 2:
        roleName = "mode";
        // code block
        break;
      default:
        roleName = "user";
    }
    setSubmitData({ username: username, password: password, role: roleName });
    setIsYesnoModal(true);
  };
  const convertDataForReactSelect = (input) => {
    let result = input?.map((value, index) => {
      return {
        value: value.id,
        label: value.name,
      };
    });
    return result;
  };
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <Box marginLeft={0}>
      <Box>
        <Button
          variant="outlined"
          color="primary"
          style={{ margin: "10px 0 20px 50px " }}
          name="add"
          onClick={handleAddNewAccount}
        >
          Add New Account
        </Button>
      </Box>
      <ReactModal
        isOpen={isAddNewAccountModal}
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
              Add New Account
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  className={classes.input}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  className={classes.input}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
            />
            {errors.password && (
              <p aria-roledescription="error" className={classes.error}>
                Password must be required
              </p>
            )}
            <Select
              name="password"
              options={convertDataForReactSelect(listRole)}
              onChange={setSelectedOption}
              value={selectedOption}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </ReactModal>
      <YesNoModal
        isModalVisible={isYesnoModal}
        hideModal={() => {}}
        title={"Confirm"}
        message={"Are you sure you want to add new Covid Case?"}
        okText={"OK"}
        cancelText={"Cancel"}
        onCancel={() => {
          setIsYesnoModal(false);
        }}
        onOk={handleConfirmAddNewAccount}
      />
      <ToastContainer />
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

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    position: "relative",
  },
  imgContent: {
    //alignSelf:"center",
    display: "flex",
  },
  imgStyle: {
    width: 450,
    alignSelf: "flex-end",
    transform: "scaleX(-1)",
  },
  input: {
    backgroundColor: "antiquewhite",
  },
}));
export default Account;
