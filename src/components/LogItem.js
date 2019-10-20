import React, { useState } from "react";
import moment from "moment";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { Flex, Card, Box, Button, Text } from "rebass";
import { Label, Textarea } from "@rebass/forms";

const sentimentNegative = "negative";
const sentimentPositive = "positive";

export default function Log({ addNewLog, defaultLog, updateLog }) {
  const [log, setLog] = useState(defaultLog && defaultLog.value);
  const [sentiment, setSentiment] = useState(
    defaultLog ? defaultLog.sentiment : null
  );
  const [isEditing, setIsEditing] = useState(!log);
  const toggleEditing = () => setIsEditing(!isEditing);
  const cancelEditing = () => {
    setLog(defaultLog ? defaultLog.value : "");
    setIsEditing(false);
  };
  function saveLog(e) {
    e.preventDefault();

    if (!defaultLog) {
      const date = moment();
      const id = date.format("dddd MMMM Do YYYY h:mm:ss a");
      addNewLog({
        id,
        date,
        value: log,
        sentiment
      });
      setLog("");
      setSentiment(null);
    } else {
      const update = {
        ...defaultLog,
        value: log,
        sentiment
      };
      updateLog(update);
      setIsEditing(false);
    }
  }
  function onLogChange({ target }) {
    setLog(target.value);
  }
  if (isEditing) {
    return (
      <Box as='form' onSubmit={saveLog} py={[2, 3]}>
        <Box mb={2}>
          <Label htmlFor='entry'>What occurred?</Label>
          <Textarea
            autoFocus
            id='entry'
            name='entry'
            onChange={onLogChange}
            value={log}
          />
        </Box>
        <Flex justifyContent='flex-end'>
          <Button
            type='button'
            mr={1}
            onClick={() => setSentiment(sentimentNegative)}
            sx={{ bg: sentiment === sentimentNegative && "tomato" }}
          >
            <FaThumbsDown />
          </Button>
          <Button
            type='button'
            mr={1}
            onClick={() => setSentiment(sentimentPositive)}
            sx={{ bg: sentiment === sentimentPositive && "limegreen" }}
          >
            <FaThumbsUp />
          </Button>
          {!!defaultLog && (
            <Button
              type='button'
              variant='secondary'
              onClick={cancelEditing}
              mr={1}
            >
              cancel
            </Button>
          )}
          <Button type='submit' variant='primary'>
            save
          </Button>
        </Flex>
      </Box>
    );
  }

  return (
    <Card sx={{ bg: "darkest", mb: 3 }}>
      <Text>{log}</Text>
      <Flex justifyContent='space-between' alignItems='center'>
        <Box sx={{ fontSize: 1, py: 2 }}>
          <Text>{moment(defaultLog.date).format("h:mm:ss a")}</Text>
          <Text>{moment(defaultLog.date).fromNow()}</Text>
        </Box>
        <Flex alignItems='center'>
          <Button onClick={toggleEditing} variant='icon' mr={2}>
            <MdModeEdit />
          </Button>
          {!!sentiment && (
            <Box mr={2}>
              {sentiment === sentimentNegative ? (
                <FaThumbsDown />
              ) : (
                <FaThumbsUp />
              )}
            </Box>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
