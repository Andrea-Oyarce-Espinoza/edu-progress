// components/StudentCard.tsx
import React from 'react';
import { Student } from '@/types/student';
import { useStudentStore } from '@/store/studentStore'; // Importamos el store global

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  // Consumimos las acciones del estado global directamente en el componente hijo
  const { updateProgress, updateGrade } = useStudentStore();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <div>
            <h3 className="font-bold text-slate-900 text-lg leading-tight">{student.name}</h3>
            <p className="text-xs text-slate-500">{student.course}</p>
          </div>
          {student.isPIE && (
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200 shadow-sm">
              PIE
            </span>
          )}
        </div>

        {/* Métricas e interacción de Notas */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg mb-4 text-center">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Asistencia</p>
            <p className={`text-lg font-bold ${student.attendance < 90 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {student.attendance}%
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Promedio</p>
            <div className="flex items-center justify-center gap-1">
              <p className={`text-lg font-bold ${student.averageGrade < 4.0 ? 'text-rose-600' : 'text-slate-800'}`}>
                {student.averageGrade.toFixed(1)}
              </p>
              {/* Botón rápido para subir nota simulada */}
              <button 
                onClick={() => updateGrade(student.id, student.averageGrade + 0.2)}
                className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-1 rounded font-bold transition"
                title="Subir 0.2 décimas"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Barra de Progreso Interactiva */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-500">Logro de Objetivos:</span>
            <span className="text-slate-900 font-bold">{student.progress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300" 
              style={{ width: `${student.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
        {student.isPIE && student.pieType && (
          <p className="text-xs text-amber-700 bg-amber-50/50 p-2 rounded border border-amber-100/50 italic">
            💡 Diagnóstico: {student.pieType}
          </p>
        )}
        
        {/* Acción global que modifica el progreso */}
        <button 
          onClick={() => updateProgress(student.id, student.progress + 5)}
          className="w-full bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition shadow-sm cursor-pointer"
        >
          📈 Registrar Avance (+5%)
        </button>
      </div>
    </div>
  );
}