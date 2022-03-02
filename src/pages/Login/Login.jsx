import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { img_background } from "../../assets/images";
import { Controller, useForm } from "react-hook-form";
import { CssBaseline } from "@mui/material";
import {
  Typography,
  Grid,
  Box,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Link,
  FormControl,
} from "@material-ui/core";
import { display, margin } from "@mui/system";
import { useHistory } from "react-router-dom";
import { login } from "../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.userStore.account);

  useEffect(() => {
    if (status.success && status.current) history.push("/checkin_status");
  }, [status.success]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    console.log("username pass", username);
    await dispatch(
      login({
        username,
        password,
        cb: () => {
          history.push("/checkin_status");
        },
      })
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.imgContent}>
        <Box sx={{ alignSelf: "center" }}>
          <Typography></Typography>
        </Box>
      </div>
      <Grid
        item
        xs={12}
        sm={1}
        md={5}
        component={Paper}
        style={{
          margin: "auto",
          padding: "auto",
          background: "rgb(63 81 181 / 4%)",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5" style ={{color: "white"}}>
           Admin Login Page
          </Typography>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                defaultValue={""}
                name="username"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    className={classes.input}
                    margin="normal"
                    required
                    defaultValue={""}
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
                defaultValue={""}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ marginTop: "10px" }}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Grid>
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: `url(${img_background})`,
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
