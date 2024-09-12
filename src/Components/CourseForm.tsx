import React, { useState } from 'react';
import { Course } from '../utils/dataModels'; 

const CourseForm = ({ setIsCourseRegistered }: { setIsCourseRegistered: (value: boolean) => void }) => {
  const [course, setCourse] = useState<Course>({
    courseCode: '',
    courseName: '',
    classLevel: 0,
    teacherFirstName: '',
    teacherLastName: '',
  });
  const [error, setError] = useState('');

  const registerCourse = (newCourse: Course) => {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));
    
    // Kurs qeydiyyatı uğurlu olduqda
    setIsCourseRegistered(true); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (course.courseCode && course.courseName && course.classLevel > 0 && course.teacherFirstName && course.teacherLastName) {
      registerCourse(course);
      setError('');
    } else {
      setError('Bütün sahələri düzgün doldurun!');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Course) => {
    const value = e.target.value;
    if (field === 'classLevel') {
      const parsedValue = parseInt(value, 10);
      setCourse({ ...course, [field]: isNaN(parsedValue) ? 0 : parsedValue });
    } else {
      setCourse({ ...course, [field]: value });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCourse({ ...course, classLevel: parseInt(e.target.value, 10) });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <label>
        Dərs Kodu:
        <input
          value={course.courseCode}
          onChange={(e) => handleInputChange(e, 'courseCode')}
          placeholder="Məsələn: MTH101"
          type="text"
        />
      </label>
      
      <label>
        Dərsin Adı:
        <input
          value={course.courseName}
          onChange={(e) => handleInputChange(e, 'courseName')}
          placeholder="Məsələn: Riyaziyyat"
          type="text"
        />
      </label>
      
      <label>
        Sinif:
        <select
          value={course.classLevel}
          onChange={handleSelectChange}
        >
          <option value="" disabled>Sinif səviyyəsini seçin</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </label>
      
      <label>
        Müəllim Adı:
        <input
          value={course.teacherFirstName}
          onChange={(e) => handleInputChange(e, 'teacherFirstName')}
          placeholder="Məsələn: Elşad"
          type="text"
        />
      </label>
      
      <label>
        Müəllim Soyadı:
        <input
          value={course.teacherLastName}
          onChange={(e) => handleInputChange(e, 'teacherLastName')}
          placeholder="Məsələn: Həsənov"
          type="text"
        />
      </label>
      
      <button type="submit">Qeydiyyat</button>
    </form>
  );
};

export default CourseForm;
