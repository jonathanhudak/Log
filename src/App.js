import React from "react";
import { ThemeProvider } from "emotion-theming";
import List from "components/List";
import Today from "components/Today";
import { Global, css } from "@emotion/core";
import { Box } from "rebass";
import presetTheme from "@rebass/preset";

const theme = {
  ...presetTheme,
  colors: {
    ...presetTheme.colors,
    text: presetTheme.colors.background,
    background: "hsl(199, 47%, 20%)",
    darkest: "hsla(199, 47%, 10%, .7)"
  },
  buttons: {
    primary: {
      color: "white",
      bg: presetTheme.colors.primary
    },
    secondary: {
      color: "white",
      bg: presetTheme.colors.secondary
    },
    outline: {
      color: "tomato",
      background: "none",
      border: `2px solid ${presetTheme.colors.primary}`
    },
    icon: {
      bg: "transparent",
      borderColor: "transparent"
    }
  }
};

export default props => (
  <ThemeProvider theme={theme}>
    <Global
      styles={css`
        html {
          background-color: ${theme.colors.background};
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
