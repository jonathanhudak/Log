import React from "react";
import { Box } from "rebass";

export default function Container(props) {
  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 600,
        margin: "auto"
      }}
      {...props}
    />
  );
}
