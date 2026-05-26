import React from 'react'; 

interface SidebarProps {
    totalStudents: number; 
    pieCount: number; 
    currentFilter: string; 
    onFilterChange: (course: string) => void; 
}

export default function Sidebar({ totalStudents, pieCount, currentFilter, onFilterChange }: SidebarProps) {
    const courses = ["Todos", "8vo Básico A", "1ero Medio B"];
    
    return (
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6 space-y-6">
            <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Filtros de Curso</h3>
                <div className="space-y-1">
                    {courses.map((course) => (
                        <button
                        key={course}
                        onClick={() => onFilterChange(course)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                         currentFilter === course
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-600 hover:bg-slate-50'
                        }`}
                        >
                            {course}
                        </button>
                    ))}
                </div>
            </div>

            <div>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Indicadores Clave</h3>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex justify-between">
            <span>Alumnos Filtrados:</span>
            <span className="font-semibold text-slate-900">{totalStudents}</span>
          </li>
          <li className="flex justify-between">
            <span>Casos PIE en lista:</span>
            <span className="font-semibold text-amber-600">{pieCount}</span>
          </li>
        </ul>
      </div>
        </aside>
    );
}