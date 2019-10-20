import React, { useState, useEffect } from "react";
import moment from "moment";
import Container from "components/Container";
import { Heading, Box } from "rebass";

export default function Now() {
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
      <Container>
        <Heading
          as="h1"
          sx={{
            fontSize: [3, 4, 5],
            p: 1
          }}
        >
          {now.format("MMMM Do YYYY, h:mm:ss a")}
        </Heading>
      </Container>
    </Box>
  );
}
