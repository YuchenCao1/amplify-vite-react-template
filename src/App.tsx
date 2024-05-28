import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  // useEffect(() => {
  //   client.models.Todo.observeQuery().subscribe({
  //     next: (data) => {
  //       console.log(data)
  //       setTodos([...data.items])
  //     },
  //   });
  // }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('API_ENDPOINT_HERE');
      const data = await response.json();
      if (response.ok) {
        setTodos(data.items);
      } else {
        throw new Error('Failed to fetch todos');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };


  useEffect(() => {
    fetchTodos();
  }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  // function deleteTodo(id: string) {
  //   client.models.Todo.delete({ id })
  // }
  const createTodo = async () => {
    const content = window.prompt("Todo content");
    if (content) {
      await fetch('API_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      fetchTodos();
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`API_ENDPOINT_HERE/${id}`, {
        method: 'DELETE',
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}>{todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
      )}
      </Authenticator>
  );
}

export default App;
