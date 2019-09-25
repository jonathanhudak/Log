import React, { useState, useEffect } from "react";
import moment from "moment";
import Container from "components/Container";
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
          py: [3, 6],
          bg: "bg",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1552484586-1a51df66315c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=768&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1024)",
          backgroundBlendMode: "multiply",
          backgroundSize: "cover"
        }}
      >
        <Container>
          <Heading
            as='h1'
            sx={{
              bg: "darkest",
              color: "white",
              // display: "inline-block",
              fontSize: [3, 4, 5],
              p: 1
            }}
          >
            {now.format("MMMM Do YYYY, h:mm:ss a")}
          </Heading>
        </Container>
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
