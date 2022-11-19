import {
  createTheme,
  styled,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";

export const Text = styled("p")(({ theme }) => ({
  fontFamily: "Raleway",
  [theme.breakpoints.up("sm")]: {
    fontSize: 21,
  },
}));

export const Heading = (props) => {
  return (
    <Typography
      variant="h1"
      fontFamily={"Raleway"}
      fontWeight={600}
      fontSize={{ xs: "1.5rem", sm: "2.5rem" }}
      sx={props.sx}
    >
      {props.children}
    </Typography>
  );
};

export const TextSpan = styled("span")(() => ({
  fontFamily: "Open Sans",
}));

export const lensTheme = createTheme({
  palette: {
    neutral: {
      main: "#5C5B5B",
      contrastText: "#fff",
    },
  },
});

export function useDesktop() {
  const t = useMediaQuery(lensTheme.breakpoints.up("sm"));

  return t;
}

// declare module "@mui/material/styles" {
//    &Palette {
//     neutral: Palette["primary"];
//   }

//   // allow configuration using `createTheme`
//    &PaletteOptions {
//     neutral?: PaletteOptions["primary"];
//   }
// }

// // Update the Button's color prop options
// declare module "@mui/material/Button" {
//   interface ButtonPropsColorOverrides {
//     neutral: true;
//   }
// }
