import React, { useState, useEffect } from "react";
import moment from "moment";
import { Heading, Box } from "rebass";

function Now() {
  const [now, setNow] = useState(moment());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [setNow]);

  return (
    <Box>
      <Box
        sx={{
          px: 4,
          py: 6,
          bg: "bg",
          backgroundImage:
            "url(https://source.unsplash.com/random/1024x768?weather)",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover",
          color: "white"
        }}
      >
        <Heading as="h1" textAlign="center" fontSize={[3, 4]}>
          {now.format("MMMM Do YYYY, h:mm:ss a")}
        </Heading>
      </Box>
    </Box>
  );
}

export default function Today() {
  return (
    <div>
      <Now />
    </div>
  );
}
