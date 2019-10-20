import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

const GET_LOGS = gql`
  {
    logs {
      id
      entry
      createdAt
    }
  }
`;

const CREATE_LOG = gql`
  mutation CreateLog($entry: String!) {
    createLog(input: { data: { entry: $entry } }) {
      log {
        id
        createdAt
        entry
      }
    }
  }
`;

const UPDATE_LOG = gql`
  mutation UpdateLog($id: ID!, $entry: String!) {
    updateLog(input: { where: { id: $id }, data: { entry: $entry } }) {
      log {
        id
        entry
        createdAt
      }
    }
  }
`;

const DELETE_LOG = gql`
  mutation DeleteLog($id: ID!) {
    deleteLog(input: { where: { id: $id } }) {
      log {
        id
      }
    }
  }
`;

function DeleteLogButton({ id }) {
  const [deleteLog, { loading, error }] = useMutation(DELETE_LOG, {
    update(
      cache,
      {
        data: {
          deleteLog: { log }
        }
      }
    ) {
      const { logs } = cache.readQuery({ query: GET_LOGS });
      cache.writeQuery({
        query: GET_LOGS,
        data: { logs: logs.filter(l => l.id !== log.id) }
      });
    }
  });

  if (loading) return <p>Deleting...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  function confirmDelete() {
    if (window.confirm("Are you sure you want to delete this log?")) {
      deleteLog({ variables: { id } });
    }
  }

  return <button onClick={confirmDelete}>delete</button>;
}

export function EditLog({ log }) {
  const [isEditing, setIsEditing] = useState(!log);
  const mutation = log ? UPDATE_LOG : CREATE_LOG;
  const action = log ? "editLog" : "createLog";
  const id = log ? log.id : undefined;
  let input;
  const [editLog, { loading, error }] = useMutation(mutation, {
    update(
      cache,
      {
        data: {
          [action]: { log }
        }
      }
    ) {
      const { logs } = cache.readQuery({ query: GET_LOGS });
      cache.writeQuery({
        query: GET_LOGS,
        data: { logs: logs.concat([log]) }
      });
    }
  });

  if (loading) return <p>Saving entry...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  if (!isEditing && log) {
    return (
      <div>
        <div>{log.entry}</div>
        <strong>{log.createdAt}</strong>
        <button onClick={() => setIsEditing(true)}>edit</button>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          editLog({ variables: { id, entry: input.value } });
          setIsEditing(false);
        }}
      >
        <input
          defaultValue={log && log.entry}
          placeholder="entry"
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">{log ? "Save changes" : "Create log"}</button>
        {log && <button onClick={() => setIsEditing(false)}>cancel</button>}
        {log && log.id && <DeleteLogButton id={log.id} />}
      </form>
    </div>
  );
}

export function ListLogs() {
  const { loading, error, data } = useQuery(GET_LOGS);

  if (loading) return "Loading logs...";
  if (error) return `Error fetching logs! ${error.message}`;
  const { logs } = data;
  return (
    <div>
      <h2>Logs</h2>
      <EditLog />

      <ul>
        {logs.map(log => (
          <li key={log.id}>
            <EditLog log={log} />
          </li>
        ))}
      </ul>
    </div>
  );
}
