import React, { useState } from "react";
import moment from "moment";
import { Card, Box, Button, Text } from "rebass";
import { Label, Textarea } from "@rebass/forms";

export default function Log({ addNewLog, defaultLog, updateLog }) {
  const [log, setLog] = useState(defaultLog && defaultLog.value);
  const [isEditing] = useState(!log);
  function saveLog(e) {
    e.preventDefault();

    if (!defaultLog) {
      const date = moment();
      const id = date.format("dddd MMMM Do YYYY h:mm:ss a");
      addNewLog({
        id,
        date,
        value: log
      });
    } else {
      const update = {
        ...defaultLog,
        value: log
      };
      updateLog(update);
    }
    setLog("");
  }
  if (isEditing) {
    return (
      <Box as="form" onSubmit={saveLog} py={[2, 3]}>
        <Box mb={2}>
          <Label htmlFor="entry">What occurred?</Label>
          <Textarea
            id="entry"
            name="entry"
            onChange={e => setLog(e.target.value)}
            value={log}
          />
        </Box>
        <Button type="submit" variant="primary">
          save
        </Button>
      </Box>
    );
  }

  return (
    <Card mb={3}>
      <Text>{log}</Text>
      <Box sx={{ fontSize: 1, py: 2 }}>
        <Text>{moment(defaultLog.date).format("h:mm:ss a")}</Text>
        <Text>{moment(defaultLog.date).fromNow()}</Text>
      </Box>
    </Card>
  );
}
