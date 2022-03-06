import React from "react";
import { Box, Typography } from "@material-ui/core/";

const TestResult = ({ date, numberOfNegative, total, onClickRow, uniqueKey }) => {
  const handleOnClick = () => {
    onClickRow(date);
  };
  return (
    <Box
      onClick={handleOnClick}
      bgcolor={"white"}
      borderRadius={10}
      marginBottom={5}
      height={70}
      boxShadow={"rgba(149, 157, 165, 0.2) 0px 8px 24px"}
      justifyContent={"space-between"}
      display={"flex"}
      width={"50%"}
      style={{ cursor: "pointer" }}
      key={uniqueKey}
    >
      <Typography
        style={{ padding: "10px 0 10px 10px ", fontWeight: "700" }}
      >{`Date: ${date}`}</Typography>
      <Box
        style={{
          padding: "10px 10px 10px 0 ",
          alignSelf: "flex-end",
          display: "flex",
        }}
      >
        <p style={{ padding: "2px 5px", fontWeight: "700" }}>Result:</p>
        <Typography
          style={{ color: `${numberOfNegative === total ? "green" : "red"}` }}
        >{`${numberOfNegative}/${total} Negative`}</Typography>
      </Box>
    </Box>
  );
};

export default TestResult;
