import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

export function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      {/* <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={20}
        thickness={4}
        {...props}
        value={100}
      /> */}
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#e61952" : "#e61952",
          animationDuration: "550ms",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={13}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export function FacebookCircularProgressChange(props) {
  return (
    <Box sx={{ position: "relative" }}>
      {/* <CircularProgress
          variant="determinate"
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
          }}
          size={20}
          thickness={4}
          {...props}
          value={100}
        /> */}
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === "light" ? "#ffffff" : ""),
          animationDuration: "550ms",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={13}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export function FacebookCircularProgressAnswer(props) {
  return (
    <>
      {/* <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={20}
        thickness={4}
        {...props}
        value={100}
      /> */}
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#e61952" : "#e61952",
          animationDuration: "340ms",
          left: 10,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        thickness={4}
        {...props}
      />
    </>
  );
}
