// components/__tests__/StudentCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentCard from '../StudentCard';
import { useStudentStore } from '@/store/studentStore';
import { Student } from '@/types/student';

// 1. Simulamos (Mock) el store global de Zustand para aislar el componente
jest.mock('@/store/studentStore', () => ({
  useStudentStore: jest.fn()
}));

describe('StudentCard - Enfoque BDD', () => {
  // Datos simulados del alumno (Dado que...)
  const mockStudent: Student = {
    id: 1,
    name: "Benjamín Muñoz",
    course: "8vo Básico A",
    attendance: 94,
    averageGrade: 6.2,
    isPIE: true,
    pieType: "NEET (TDAH)",
    progress: 75
  };

  const mockUpdateProgress = jest.fn();
  const mockUpdateGrade = jest.fn();

  beforeEach(() => {
    // Definimos qué devolverá el hook global cuando el componente lo use
    (useStudentStore as unknown as jest.Mock).mockReturnValue({
      updateProgress: mockUpdateProgress,
      updateGrade: mockUpdateGrade
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // --- ESCENARIO BDD 1 ---
  test('Dado un alumno, debería renderizar su nombre, promedio y etiqueta PIE correctamente', () => {
    // Cuanado renderizamos el componente
    render(<StudentCard student={mockStudent} />);

    // Entonces esperamos encontrar los elementos clave en la pantalla
    expect(screen.getByText('Benjamín Muñoz')).toBeInTheDocument();
    expect(screen.getByText('6.2')).toBeInTheDocument();
    expect(screen.getByText('PIE')).toBeInTheDocument();
    expect(screen.getByText('💡 Diagnóstico: NEET (TDAH)')).toBeInTheDocument();
  });

  // --- ESCENARIO BDD 2 ---
  test('Dado que el profesor quiere registrar un avance, cuando hace click en el botón, entonces debe disparar la acción global', () => {
    // Dado que el componente está en pantalla
    render(<StudentCard student={mockStudent} />);

    // Cuando el usuario busca el botón e interactúa haciendo click
    const progressButton = screen.getByRole('button', { name: /Registrar Avance/i });
    fireEvent.click(progressButton);

    // Entonces la acción del estado global debe haberse ejecutado con el ID del alumno y su nuevo progreso esperado (75 + 5 = 80)
    expect(mockUpdateProgress).toHaveBeenCalledWith(1, 80);
  });
});