import React from "react";
import { ThemeProvider } from "emotion-theming";
import theme from "@rebass/preset";
import List from "components/List";
import Today from "components/Today";
import { Global, css } from "@emotion/core";
import { Box } from "rebass";

export default props => (
  <ThemeProvider
    theme={{
      ...theme,
      colors: {
        ...theme.colors,
        primary: "#1F3611",
        text: "#114",
        bg: "#ffe500"
      }
    }}
  >
    <Global
      styles={css`
        html {
          background: #ffe500;
        }
        html,
        body {
          margin: 0;
          padding: 0;
        }
      `}
    />
    <Box
      sx={{
        fontFamily: "body",
        color: "text",
        height: "inherit"
      }}
    >
      <Today />
      <List />
      {props.children}
    </Box>
  </ThemeProvider>
);
