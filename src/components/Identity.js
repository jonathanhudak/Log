import React, { useState } from "react";
import gql from "graphql-tag";
import { Box } from "rebass";
import { Label, Select } from "@rebass/forms";
import { useMutation, useQuery } from "@apollo/react-hooks";

export const GET_IDENTITIES = gql`
  {
    identities {
      id
      name
      habits {
        id
        name
      }
    }
  }
`;

const CREATE_IDENTITY = gql`
  mutation CreateIdentity($name: String!) {
    createIdentity(input: { data: { name: $name } }) {
      identity {
        id
        name
      }
    }
  }
`;

const UPDATE_IDENTITY = gql`
  mutation UpdateIdentity($id: ID!, $name: String!) {
    updateIdentity(input: { where: { id: $id }, data: { name: $name } }) {
      identity {
        id
        name
      }
    }
  }
`;

const DELETE_IDENTITY = gql`
  mutation DeleteIdentity($id: ID!) {
    deleteIdentity(input: { where: { id: $id } }) {
      identity {
        id
      }
    }
  }
`;

export function IdentitySelect({ value, onChange }) {
  const { loading, error, data } = useQuery(GET_IDENTITIES);

  if (loading) return "Loading identities...";
  if (error) return `Error fetching identities! ${error.message}`;

  const { identities } = data;
  return (
    <div>
      <Box>
        <Label htmlFor='country'>Identity</Label>
        <Select
          value={value}
          id='identity-select'
          name='identity'
          onChange={e => onChange(e.target.value)}
        >
          {identities.map(identity => (
            <option key={identity.id} value={identity.id}>
              {identity.name}
            </option>
          ))}
        </Select>
      </Box>
    </div>
  );
}

function DeleteIdentityButton({ id }) {
  const [deleteIdentity, { loading, error }] = useMutation(DELETE_IDENTITY, {
    update(
      cache,
      {
        data: {
          deleteIdentity: { identity }
        }
      }
    ) {
      const { identities } = cache.readQuery({ query: GET_IDENTITIES });
      cache.writeQuery({
        query: GET_IDENTITIES,
        data: { identities: identities.filter(l => l.id !== identity.id) }
      });
    }
  });

  if (loading) return <p>Deleting identity...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  function confirmDelete() {
    if (window.confirm("Are you sure you want to delete this identity?")) {
      deleteIdentity({ variables: { id } });
    }
  }

  return <button onClick={confirmDelete}>delete</button>;
}

export function EditIdentity({ identity }) {
  const [isEditing, setIsEditing] = useState(!identity);
  const mutation = identity ? UPDATE_IDENTITY : CREATE_IDENTITY;
  const action = identity ? "updateIdentity" : "createIdentity";
  const id = identity ? identity.id : undefined;
  let input;
  const [editIdentity, { loading, error }] = useMutation(mutation, {
    update(cache, { data }) {
      const { identity } = data[action];
      const { identities } = cache.readQuery({ query: GET_IDENTITIES });
      const nextIdentities =
        action === "createIdentity"
          ? identities.concat([identity])
          : identities.map(i => {
              if (i.id === identity.id) {
                return {
                  ...i,
                  ...identity
                };
              }
              return i;
            });

      cache.writeQuery({
        query: GET_IDENTITIES,
        data: { identities: nextIdentities }
      });
    }
  });

  if (loading) return <p>Saving identity...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  if (!isEditing && identity) {
    return (
      <div>
        <strong>{identity.name}</strong>
        <button onClick={() => setIsEditing(true)}>edit</button>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          editIdentity({ variables: { id, name: input.value } });
          setIsEditing(false);
        }}
      >
        <input
          placeholder='identity name'
          defaultValue={identity && identity.name}
          ref={node => {
            input = node;
          }}
        />
        <button type='submit'>
          {identity ? "Save changes" : "Create identity"}
        </button>
        {identity && (
          <button onClick={() => setIsEditing(false)}>cancel</button>
        )}
        {identity && identity.id && <DeleteIdentityButton id={identity.id} />}
      </form>
    </div>
  );
}

export function ListIdentities() {
  const { loading, error, data } = useQuery(GET_IDENTITIES);

  if (loading) return "Loading identities...";
  if (error) return `Error fetching identities! ${error.message}`;
  const { identities } = data;
  return (
    <div>
      <h2>Identities</h2>
      <EditIdentity />

      <ul>
        {identities.map(identity => (
          <li key={identity.id}>
            <EditIdentity identity={identity} />
          </li>
        ))}
      </ul>
    </div>
  );
}
