import { useEffect, useState } from 'react'
import { api } from '../api.ts'
import type { Todo } from '../../src/types/todo.ts'
import "../style.css"
import Table from '../components/Table.tsx'
import SideBar from '../components/SideBar.tsx'

// Empty HTML from the server; data fetched by the browser after load.
export function SpaAdminPage() {
  const [todos, setTodos] = useState<Todo[] | null>(null)

  useEffect(() => {
    api.todo.list.query().then(setTodos)
  }, [])

  return (
    // md:flex = sidebar and content side by side (stacked on mobile).
    <div className="min-h-screen bg-extralight md:flex">
        <SideBar />

        {/* min-w-0: lets the table scroll instead of widening the page */}
        <main className="min-w-0 flex-1 p-6 md:p-10">
          {todos && (
            <Table
              columns={['N°', 'Titre', 'Longueur', '']}
              // Cells don't need a key: Table wraps each one in a keyed <td>.
              /* oxlint-disable react/jsx-key */
              rows={todos.map((todo) => [
                todo.id,
                <span className="font-semibold">{todo.title}</span>,
                <span className="rounded bg-light px-2 py-0.5 text-bold">{todo.title.length} car.</span>,
                <button type="button" onClick={() => alert(`Todo ${todo.id}`)} className="text-bold hover:underline">Modifier</button>,
              ])}
              /* oxlint-enable react/jsx-key */
            />
          )}
        </main>
      {/* <h1>Todos (SPA)</h1> */}
      {/* {todos ? <TodoList todos={todos} setTodos={(fn) => setTodos((prev) => fn(prev ?? []))} /> : <p>Chargement…</p>} */}
    </div>
  )
}
