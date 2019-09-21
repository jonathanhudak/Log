import React from "react";
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";
import List from "components/List";
import Today from "components/Today";
import { Global, css } from "@emotion/core";
import { Box } from "rebass";

console.log(theme);

export default props => (
  <ThemeProvider
    theme={{
      ...theme,
      colors: {
        ...theme.colors,
        primary: "#6D4C41",
        text: "#3E2723",
        bg: "#b8d0d3"
      }
    }}
  >
    <Global
      styles={css`
        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          height: 100%;
        }
      `}
    />
    <Box
      sx={{
        fontFamily: "body",
        color: "text",
        bg: "bg",
        height: "inherit"
      }}
    >
      <Today />
      <List />
      {props.children}
    </Box>
  </ThemeProvider>
);
