import * as React from "react";
import TextField from "@mui/material/TextField";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";

export default function BasicDateRangePicker({ valuee, setValue, checkValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {checkValue === "1" || checkValue === "2" ? (
        <MobileDatePicker
          value={valuee[1]}
          style={{ background: "transparent" }}
          minDate={new Date(new Date() * 1.00005)}
          onChange={(newValue) => {
            setValue([new Date(), newValue]);
            console.log(new Date(), newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      ) : null}
    </LocalizationProvider>
  );
}
