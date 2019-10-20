import React from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";

const GET_LOGS = gql`
  {
    logs {
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
    updateLog(input: { where: { id: $id }, data: { entry: $entry } })
  }
`;

// const DELETE_LOG = gql`
//   mutation DeleteLog($id: ID!) {
//     deleteLog(input: { where: { id: $id } }) {
//       log {
//         id
//       }
//     }
//   }
// `;

export function CreateLog() {
  let input;
  const [createLog, { data, loading, error }] = useMutation(CREATE_LOG, {
    update(
      cache,
      {
        data: {
          createLog: { log }
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createLog({ variables: { entry: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Log</button>
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
      <CreateLog />

      <ul>
        {logs.map(log => (
          <li>
            <div>{log.entry}</div>
            <strong>{log.createdAt}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
