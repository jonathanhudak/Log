import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { IdentitySelect } from "components/Identity";

const GET_HABITS = gql`
  {
    habits {
      id
      name
      identity {
        name
      }
    }
  }
`;

const CREATE_HABIT = gql`
  mutation CreateHabit($name: String!) {
    createHabit(input: { data: { name: $name } }) {
      habit {
        id
        name
      }
    }
  }
`;

const UPDATE_HABIT = gql`
  mutation UpdateHabit($id: ID!, $name: String!, $identityId: ID) {
    updateHabit(
      input: {
        where: { id: $id }
        data: { name: $name, identity: $identityId }
      }
    ) {
      habit {
        id
        name
      }
    }
  }
`;

const DELETE_HABIT = gql`
  mutation DeleteHabit($id: ID!) {
    deleteHabit(input: { where: { id: $id } }) {
      habit {
        id
      }
    }
  }
`;

function DeleteHabitButton({ id }) {
  const [deleteHabit, { loading, error }] = useMutation(DELETE_HABIT, {
    update(
      cache,
      {
        data: {
          deleteHabit: { habit }
        }
      }
    ) {
      const { habits } = cache.readQuery({ query: GET_HABITS });
      cache.writeQuery({
        query: GET_HABITS,
        data: { habits: habits.filter(l => l.id !== habit.id) }
      });
    }
  });

  if (loading) return <p>Deleting...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  function confirmDelete() {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      deleteHabit({ variables: { id } });
    }
  }

  return <button onClick={confirmDelete}>delete</button>;
}

export function EditHabit({ habit }) {
  const [isEditing, setIsEditing] = useState(!habit);
  const [identityId, setIdentityId] = useState(
    habit && habit.identity && habit.identity.id
  );
  const mutation = habit ? UPDATE_HABIT : CREATE_HABIT;
  const action = habit ? "updateHabit" : "createHabit";
  const id = habit ? habit.id : undefined;
  let input;
  const [editHabit, { loading, error }] = useMutation(mutation, {
    update(cache, { data }) {
      const { habit } = data[action];
      const { habits } = cache.readQuery({ query: GET_HABITS });
      const nextHabits =
        action === "createHabit"
          ? habits.concat([habit])
          : habits.map(h => {
              if (h.id === habit.id) {
                return {
                  ...h,
                  ...habit
                };
              }
              return h;
            });

      cache.writeQuery({
        query: GET_HABITS,
        data: { habits: nextHabits }
      });
    }
  });

  if (loading) return <p>Saving habit...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  if (!isEditing && habit) {
    return (
      <div>
        <strong>{habit.name}</strong>
        {habit.identity && <span>{habit.identity.name}</span>}
        <button onClick={() => setIsEditing(true)}>edit</button>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          editHabit({ variables: { id, name: input.value, identityId } });
          setIsEditing(false);
        }}
      >
        <input
          placeholder='habit name'
          defaultValue={habit && habit.name}
          ref={node => {
            input = node;
          }}
        />
        <IdentitySelect value={identityId} onChange={setIdentityId} />
        <button type='submit'>{habit ? "Save changes" : "Create habit"}</button>
        {habit && <button onClick={() => setIsEditing(false)}>cancel</button>}
        {habit && habit.id && <DeleteHabitButton id={habit.id} />}
      </form>
    </div>
  );
}

export function ListHabits() {
  const { loading, error, data } = useQuery(GET_HABITS);

  if (loading) return "Loading habits...";
  if (error) return `Error fetching habits! ${error.message}`;
  const { habits } = data;
  return (
    <div>
      <h2>Habits</h2>
      <EditHabit />

      <ul>
        {habits.map(habit => (
          <li key={habit.id}>
            <EditHabit habit={habit} />
          </li>
        ))}
      </ul>
    </div>
  );
}
