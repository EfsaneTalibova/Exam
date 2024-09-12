import React, { useState } from 'react';
import { Exam, Course } from '../utils/dataModels';

const ExamForm = () => {
  const [exam, setExam] = useState<Exam | null>(null);  // Initialize state as null
  const [error, setError] = useState('');
  const registerExam = (newExam: Exam) => {
    const courses: Course[] = JSON.parse(localStorage.getItem('courses') || '[]');
    let courseFound = false;
    let studentFound = false;

    // Find the course with the provided courseCode
    const course = courses.find(c => c.courseCode === newExam.courseCode);

    if (course) {
      courseFound = true;
      // Check if the student with the provided studentId is in the course
      if (course.students) {
        const student = course.students.find(s => s.studentId === newExam.studentId);
        if (student) {
          studentFound = true;
          // Add/update the student's exam in the course
          if (!student.exams) {
            student.exams = [];
          }
          const existingExamIndex = student.exams.findIndex(exam => exam.courseCode === newExam.courseCode);
          if (existingExamIndex >= 0) {
            // Update existing exam
            student.exams[existingExamIndex] = newExam;
          } else {
            // Add new exam
            student.exams.push(newExam);
          }
          // Update the course in localStorage
          localStorage.setItem('courses', JSON.stringify(courses));
          setError('');
        } else {
          setError('Bu şagird bu dərsə qeydiyyatda deyil!');
        }
      } else {
        setError('Bu dərsdə heç bir şagird yoxdur!');
      }
    } else {
      setError('Belə dərs tapılmadı!');
    }

    if (!courseFound || !studentFound) {
      return;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exam && exam.courseCode && exam.studentId > 0 && exam.examDate && exam.grade >= 2 && exam.grade <= 5) {
      registerExam(exam);
    } else {
      setError('Bütün sahələri düzgün doldurun!');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Exam) => {
    const value = e.target.value;
    if (exam) {
      if (field === 'studentId') {
        const parsedValue = parseInt(value, 10);
        setExam({ ...exam, [field]: isNaN(parsedValue) ? 0 : parsedValue });
      } else if (field === 'grade') {
        const parsedValue = parseInt(value, 10);
        setExam({ ...exam, [field]: parsedValue });
      } else {
        setExam({ ...exam, [field]: value });
      }
    } else {
      // Initialize exam state if it was null
      setExam({ courseCode: '', studentId: 0, examDate: '', grade: 2 });
    }
  };

  return (
    <><h2>İmtahan Qeydiyyatı</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>
          Dərs Kodu:
          <input
            value={exam?.courseCode || ''}
            onChange={(e) => handleInputChange(e, 'courseCode')}
            placeholder="Məsələn: MTH101"
            type="text"
          />
        </label>
        <label>
          Şagird Nömrəsi:
          <input
            value={exam?.studentId || ''}
            onChange={(e) => handleInputChange(e, 'studentId')}
            placeholder="Məsələn: 123"
            type="number"
          />
        </label>
        <label>
          İmtahan Tarixi:
          <input
            value={exam?.examDate || ''}
            onChange={(e) => handleInputChange(e, 'examDate')}
            placeholder="Məsələn: 2024-05-12"
            type="date"
          />
        </label>
        <label>
          Qiymət:
          <select
            value={exam?.grade || 2}
            onChange={(e) => handleInputChange(e, 'grade')}
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </label>
        <button type="submit">Qeydiyyat</button>
      </form>
      </>
  );
};

export default ExamForm;
