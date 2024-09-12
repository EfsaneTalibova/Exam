import React, { useState } from 'react';
import { Student, Course } from '../utils/dataModels'; 

const StudentForm = ({ setIsStudentRegistered }: { setIsStudentRegistered: (value: boolean) => void }) => {
  const [student, setStudent] = useState<Student>({
    studentId: 0,
    firstName: '',
    lastName: '',
    classLevel: 0
  });
  const [error, setError] = useState('');

  const registerStudent = (newStudent: Student) => {
    const courses: Course[] = JSON.parse(localStorage.getItem('courses') || '[]');
    const students: Student[] = JSON.parse(localStorage.getItem('students') || '[]');

    // Check if course exists for the class level
    const course = courses.find(c => c.classLevel === newStudent.classLevel);
    if (course) {
      // Update the course with the new student
      if (course.students) {
        course.students.push(newStudent);
      } else {
        course.students = [newStudent];
      }
      // Update courses in localStorage
      localStorage.setItem('courses', JSON.stringify(courses));
    } else {
      setError('Bu sinif üçün qeydiyyatlı dərs yoxdur!');
      return;
    }

    // Add the student to the students list
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    
    // Clear the error and mark the registration as successful
    setError('');
    setIsStudentRegistered(true);  // Mark the student registration as successful
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (student.studentId > 0 && student.firstName && student.lastName && student.classLevel > 0) {
      registerStudent(student);
    } else {
      setError('Bütün sahələri düzgün doldurun!');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Student) => {
    const value = e.target.value;
    if (field === 'studentId' || field === 'classLevel') {
      const parsedValue = parseInt(value, 10);
      setStudent({
        ...student,
        [field]: isNaN(parsedValue) ? 0 : parsedValue
      });
    } else {
      setStudent({
        ...student,
        [field]: value
      });
    }
  };

  return (
    <>
     <h2>Şagird Qeydiyyatı</h2>
     <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Şagird Nömrəsi:
        <input
          value={student.studentId || ''}
          onChange={(e) => handleInputChange(e, 'studentId')}
          placeholder="Məsələn: 123"
          type="number"
          maxLength={5}
        />
      </label>
      <label>
        Şagird Adı:
        <input
          value={student.firstName}
          onChange={(e) => handleInputChange(e, 'firstName')}
          placeholder="Məsələn: Məmməd"
          type="text"
        />
      </label>
      <label>
        Şagird Soyadı:
        <input
          value={student.lastName}
          onChange={(e) => handleInputChange(e, 'lastName')}
          placeholder="Məsələn: Quliyev"
          type="text"
        />
      </label>
      <label>
        Sinif:
        <input
          value={student.classLevel || ''}
          onChange={(e) => handleInputChange(e, 'classLevel')}
          placeholder="Məsələn: 7"
          type="number"
        />
      </label>
      <button type="submit">Qeydiyyat</button>
    </form>
    </>
    
  );
};

export default StudentForm;
