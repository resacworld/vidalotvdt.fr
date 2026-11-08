import { useState } from 'react'
import type { Todo } from '../../src/types/todo.ts'
import { TodoList } from './TodoList.tsx'
import Navbar from '../components/NavBar.tsx'
import ProjectCard from '../components/ProjectCard.tsx'
import SkillCard from '../components/SkillCard.tsx'
import TimeLine from '../components/TimeLine.tsx'

// Data comes from the server (already in the HTML), no fetch on load.
export function SsrPage({ todos: initialTodos }: { todos: Todo[] }) {
  const [todos, setTodos] = useState(initialTodos)
  return (
    <>
      <Navbar />
      <h1>Todos (SSR)</h1>
      <TodoList todos={todos} setTodos={setTodos} />

      <ProjectCard
      title='Hello'
      description='Lorem ipsum dolor'
      status='En cours'
      tags={["C#", "KRL"]}
      />

      <SkillCard 
      title='Skills'
      skills={["C#", "KRL", "C++", "C", "Arduino", "etc..."]}
      />

      <TimeLine 
      steps={[
        {
          date: "2023-2025",
          school: "IMERIR",
          schoolDetail: "Ocitanie",
          role: "Alternant informaticien",
          company: "NovaLynx",
          companyDetail: "Integrateur d'innovations",
          current: true
        },
        {
          date: "2025-2026",
          school: "CNAM",
          schoolDetail: "Ocitanie",
          role: "Alternant informaticien / roboticien",
          company: "NovaLynx",
          companyDetail: "Integrateur d'innovations",
          current: true
        },
        {
          date: "2026-2029",
          school: "CESI",
          schoolDetail: "Ocitanie",
          role: "Alternant gestion de projet",
          company: "NovaLynx",
          companyDetail: "Integrateur d'innovations",
          current: true
        }
      ]}
      />
    </>
  )
}
