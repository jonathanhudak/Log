import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import moment from "moment";
import useLogs from "utils/useLogs";
import Log from "components/Log";
import { Box, Flex, Heading, Button } from "rebass";
import Container from "components/Container";
import { Label, Select } from "@rebass/forms";

const ascending = "ASC";
const descending = "DEC";

function Sorter({ sort, setSort }) {
  return (
    <Box pt={[2, 4]}>
      <Label htmlFor='sorting' mb={1}>
        Logs sorting
      </Label>
      <Select
        id='sorting'
        name='sorting'
        value={sort}
        onChange={e => {
          setSort(e.target.value);
        }}
      >
        <option value={ascending}>ascending</option>
        <option value={descending}>descending</option>
      </Select>
    </Box>
  );
}

function groupLogsByDay(logs = []) {
  return logs.reduce((acc, log) => {
    const day = moment(log.date).format("YYYY-MM-DD");

    if (acc[day]) {
      acc[day].push(log);
    } else {
      acc[day] = [log];
    }
    return acc;
  }, {});
}

function sortLogs(logs, sort) {
  return logs.sort((a, b) => {
    if (sort === ascending) {
      return moment(a.date).valueOf() - moment(b.date).valueOf();
    }
    return moment(b.date).valueOf() - moment(a.date).valueOf();
  });
}

const listStyle = {
  listStyle: "none",
  p: 0,
  m: 0
};

function DayLog({ day, logs, sort, updateLog }) {
  const [open, setIsOpen] = useState(moment(day).isSame(moment(), "day"));
  return (
    <Box as='li' sx={{ mb: 1 }}>
      <Flex justifyContent='space-between' sx={{ mb: 2 }}>
        <Heading>{moment(day).format("dddd")}</Heading>

        <Button variant='outline' onClick={() => setIsOpen(!open)}>
          <Box
            as={open ? MdExpandLess : MdExpandMore}
            sx={{ fontSize: [3, 4] }}
          />
        </Button>
      </Flex>
      {open && (
        <Box as='ul' sx={listStyle}>
          {sortLogs(logs, sort).map(log => (
            <Box as='li' key={log.id}>
              <Log defaultLog={log} updateLog={updateLog} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

const enableSorting = false;

export default function List() {
  const { logs, addNewLog, updateLog } = useLogs();
  const [sort, setSort] = useState(descending);
  const sortedLogs = sortLogs(logs);

  const byDay = groupLogsByDay(sortedLogs);

  return (
    <Container>
      <Box as='ul' sx={listStyle}>
        <Box as='li'>
          <Log addNewLog={addNewLog} updateLog={updateLog} />
        </Box>

        {Object.entries(byDay).map(([day, dayLogs]) => (
          <DayLog key={day} updateLog={updateLog} logs={dayLogs} day={day} />
        ))}
      </Box>
      {enableSorting && <Sorter sort={sort} setSort={setSort} />}
    </Container>
  );
}
