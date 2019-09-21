import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import moment from "moment";

const logsStorageKey = "my_logs";

function Log({ addNewLog, defaultLog, updateLog }) {
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
      <form onSubmit={saveLog} style={{ paddingTop: 16 }}>
        <label>
          What happened?
          <br />
          <textarea
            style={{ width: "300px" }}
            onChange={e => setLog(e.target.value)}
            value={log}
          />
        </label>
        <button type="submit" style={{ background: "limegreen" }}>
          save
        </button>
      </form>
    );
  }

  return (
    <div>
      <strong>{defaultLog && defaultLog.id}</strong> —{log}
    </div>
  );
}

const ascending = "ASC";
const descending = "DEC";
function List({ logs, addNewLog, updateLog }) {
  const [sort, setSort] = useState(descending);
  const sortedLogs = logs.sort((a, b) => {
    if (sort === ascending) {
      return moment(a.date).valueOf() - moment(b.date).valueOf();
    }
    return moment(b.date).valueOf() - moment(a.date).valueOf();
  });
  return (
    <div>
      <select
        value={sort}
        onChange={e => {
          setSort(e.target.value);
        }}
      >
        <option value={ascending}>ascending</option>
        <option value={descending}>descending</option>
      </select>
      <ul>
        <li>
          <Log addNewLog={addNewLog} updateLog={updateLog} />
        </li>
        {sortedLogs.map(log => (
          <li key={log.id}>
            <Log defaultLog={log} updateLog={updateLog} />
          </li>
        ))}
      </ul>
    </div>
  );
}

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

  return <h1>{now.format("MMMM Do YYYY, h:mm:ss a")}</h1>;
}

function Today() {
  return (
    <div>
      <Now />
    </div>
  );
}

function App() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const storageLogs = localStorage.getItem(logsStorageKey);
    if (storageLogs) {
      setLogs(JSON.parse(storageLogs));
    }
  }, [setLogs]);
  const saveToLocalStorage = useCallback(newValue => {
    localStorage.setItem(logsStorageKey, JSON.stringify(newValue));
  }, []);

  function updateLog(id, newLog) {
    const updatedLogs = logs.map(oldLog => {
      if (oldLog.id === id) {
        return {
          ...oldLog,
          ...newLog
        };
      }
      return oldLog;
    });
    setLogs(updatedLogs);
    saveToLocalStorage(updatedLogs);
  }
  function addNewLog(newLog) {
    const nextLogs = [...logs, newLog];
    setLogs(nextLogs);
    saveToLocalStorage(nextLogs);
  }
  return (
    <div className="App">
      <Today />
      <List logs={logs} addNewLog={addNewLog} updateLog={updateLog} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
