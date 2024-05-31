import React, { useEffect, useState } from "react";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from "../amplify/data/resource";
import { useUser } from "./UserContext";

Amplify.configure(outputs);

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState([]);
  const { user, signOut } = useUser();
  
  useEffect(() => {
    fetchTodos();
  }, [user]);


  async function fetchTodos() {
    const { data: originTodos, errors } = await client.models.Todo.list();
    if (!errors) {
      setTodos(originTodos);
    }
  }

  function createTodo() {
    const input = window.prompt("Todo content");
    if (input) {
      let todoCreation = client.models.Todo.create({content: input});
      todoCreation.then(result => {
        const nextTodos = [...todos, result.data];
        setTodos(nextTodos);
      });
    }
  }

  function deleteTodo(id: string, index: number) {
    let updatedTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    client.models.Todo.delete({id});
    setTodos(updatedTodos);
  }

  return (
        <main>
          <h1>{user ? `${user.signInDetails.loginId || user.attributes?.email}'s Todos` : "Guest's Todos"}</h1>
          <button onClick={createTodo}>+ New</button>
          <ul>
            {todos.map((todo, index) => (
              <li key={todo.id} onClick={() => deleteTodo(todo.id, index)}>
                {todo.content}
              </li>
            ))}
          </ul>
          <div>🥳 App successfully hosted. Try creating a new todo.</div>
          <button onClick={signOut}>Sign out</button>
        </main>

  );
}

export default App;
