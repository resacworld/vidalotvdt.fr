import React from "react";
import { TadpoleIcon } from "../components/TadpoleIcon.tsx";

export default function LoadingPage () {
    return <main className="flex min-h-screen items-center justify-center bg-extralight px-4 font-grotesk">
      <div className="flex w-full max-w-sm gap-4 rounded-lg bg-white p-8 shadow">
        <TadpoleIcon />
        <h1 className="text-2xl font-semibold text-extrabold">Chargement...</h1>
      </div>
    </main>
}