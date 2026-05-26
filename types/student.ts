// types/student.ts

export type PIEType = 'NEET (TDAH)' | 'NEEP (Auditiva)' | 'NEEP (Visual)' | 'NEET (DEA)' | null;

export interface Student {
    id: number; 
    name: string; 
    course: string; 
    attendance: number; 
    averageGrade: number; 
    isPIE: boolean; 
    pieType: PIEType; 
    progress: number; 
    lastAlert?: string; 
}

// ⬇️ NUEVA INTERFAZ PARA EL ESTADO GLOBAL
export interface StudentState {
  students: Student[];
  updateProgress: (id: number, newProgress: number) => void;
  updateGrade: (id: number, newGrade: number) => void;
}