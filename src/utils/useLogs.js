import { useState, useEffect, useCallback } from "react";
const logsStorageKey = "my_logs";

export default function useLogs() {
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

  function updateLog(newLog) {
    const updatedLogs = logs.map(oldLog => {
      if (oldLog.id === newLog.id) {
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

  return {
    logs,
    addNewLog,
    updateLog
  };
}
