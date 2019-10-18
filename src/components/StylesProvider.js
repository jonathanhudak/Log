import React from "react";
import { ThemeProvider } from "emotion-theming";
import { Global, css } from "@emotion/core";
import presetTheme from "@rebass/preset";

const theme = {
  ...presetTheme
};

export default ({ children }) => (
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
        html,
        body,
        #root,
        .wrapper {
          height: 100%;
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}
    />
    {children}
  </ThemeProvider>
);
