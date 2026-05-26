// app/page.tsx
"use client";

import React, { useState } from 'react';
import { useStudentStore } from '@/store/studentStore'; // Importamos nuestro Store
import StudentCard from '@/components/StudentCard';
import Sidebar from '@/components/Sidebar';

export default function Dashboard() {
  // Extraemos la lista global de alumnos
  const { students } = useStudentStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('Todos');

  // Filtramos sobre el estado global
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'Todos' || student.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const pieCount = filteredStudents.filter(s => s.isPIE).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xl">EP</div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">EduProgress</h1>
            <p className="text-xs text-slate-500">Plataforma de Seguimiento Técnico Escolar</p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar 
          totalStudents={filteredStudents.length} 
          pieCount={pieCount} 
          currentFilter={courseFilter}
          onFilterChange={setCourseFilter}
        />

        <main className="flex-1 p-6 md:p-8">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Panel de Alumnos</h2>
              <p className="text-sm text-slate-500">Monitoreo en tiempo real de adecuaciones curriculares con estado globalizado.</p>
            </div>
            
            <div className="w-full sm:w-72">
              <input 
                type="text" 
                placeholder="Buscar alumno..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              />
            </div>
          </div>

          {filteredStudents.length > 0 ? (
            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <StudentCard 
                  key={student.id} 
                  student={student} 
                />
              ))}
            </section>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
              <p className="text-slate-500 text-sm">No se encontraron alumnos con los criterios seleccionados.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
