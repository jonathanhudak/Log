import React, { useState } from "react";
import moment from "moment";
import useLogs from "utils/useLogs";
import Log from "components/Log";
import { Box } from "rebass";
import Container from "components/Container";
import { Label, Select } from "@rebass/forms";

const ascending = "ASC";
const descending = "DEC";

function Sorter({ sort, setSort }) {
  return (
    <Box pt={[2, 4]}>
      <Label htmlFor="sorting" mb={1}>
        Logs sorting
      </Label>
      <Select
        id="sorting"
        name="sorting"
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

export default function List() {
  const { logs, addNewLog, updateLog } = useLogs();
  const [sort, setSort] = useState(descending);
  const sortedLogs = logs.sort((a, b) => {
    if (sort === ascending) {
      return moment(a.date).valueOf() - moment(b.date).valueOf();
    }
    return moment(b.date).valueOf() - moment(a.date).valueOf();
  });
  return (
    <Container>
      <Box
        as="ul"
        sx={{
          listStyle: "none",
          p: 0,
          m: 0
        }}
      >
        <Box as="li">
          <Log addNewLog={addNewLog} updateLog={updateLog} />
        </Box>
        {sortedLogs.map(log => (
          <Box as="li" key={log.id}>
            <Log defaultLog={log} updateLog={updateLog} />
          </Box>
        ))}
      </Box>
      <Sorter sort={sort} setSort={setSort} />
    </Container>
  );
}
