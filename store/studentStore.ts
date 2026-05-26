// store/studentStore.ts
import { create } from 'zustand';
import { StudentState, Student } from '@/types/student';

const initialStudents: Student[] = [
  { id: 1, name: "Benjamín Muñoz", course: "8vo Básico A", attendance: 94, averageGrade: 6.2, isPIE: true, pieType: "NEET (TDAH)", progress: 75 },
  { id: 2, name: "Constanza Silva", course: "8vo Básico A", attendance: 88, averageGrade: 5.8, isPIE: false, pieType: null, progress: 40 },
  { id: 3, name: "Matías Yarza", course: "1ero Medio B", attendance: 100, averageGrade: 6.7, isPIE: true, pieType: "NEEP (Auditiva)", progress: 90 }
];

export const useStudentStore = create<StudentState>((set) => ({
  // Estado inicial
  students: initialStudents,

  // Acción para actualizar el progreso de un alumno
  updateProgress: (id, newProgress) => set((state) => ({
    students: state.students.map((student) =>
      student.id === id 
        ? { ...student, progress: Math.min(100, Math.max(0, newProgress)) } // Asegura que esté entre 0 y 100
        : student
    )
  })),

  // Acción para actualizar la nota promedio
  updateGrade: (id, newGrade) => set((state) => ({
    students: state.students.map((student) =>
      student.id === id 
        ? { ...student, averageGrade: Math.min(7.0, Math.max(1.0, newGrade)) } // Escala del (1.0 a 7.0)
        : student
    )
  }))
}));