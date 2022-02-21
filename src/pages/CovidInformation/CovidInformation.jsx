import MUIDataTable from "mui-datatables";
import Box from "@material-ui/core/Box";
import React, { useState, useEffect } from "react";
import { responsiveFontSizes, createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/styles";

const CovidInformation = () => {
  const URL_API =
    "https://cors-anywhere.herokuapp.com/https://congdulieu.vn/api/dataset/MTAyNTI4?limit=100&offset=0";
  const axios = require("axios");
  const username = "vietanh269";
  const password = "Vietanh2699";

  const token = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64"
  );
  const [data, setData] = useState();
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
      name: "ngay_cong_bo",
      label: "Ngày công bố",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "ban_tin",
      label: "Số bảng tin",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "thong_tin_dich_te",
      label: "Thông tin dịch tễ",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const getData = async () => {
    await axios
      .get(URL_API, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Basic ${token}`,
        },
      })
      .then(function (response) {
        console.log("Authenticated", response);
        setData(response.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <Box marginLeft={0}>
      <ThemeProvider theme={theme}>
        <MUIDataTable
          title={"Thông tin dịch tễ Covid tại Đà Nãng"}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </Box>
  );
};
export default CovidInformation;
