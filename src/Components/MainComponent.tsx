import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm.tsx';
import StudentForm from './StudentForm.tsx';
import ExamForm from './ExamForm.tsx';

const MainComponent = () => {
    const [isCourseRegistered, setIsCourseRegistered] = useState(false);
    const [isStudentRegistered, setIsStudentRegistered] = useState(false);
    useEffect(() => {
        // Kurs qeydiyyatını yoxlayın
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        if (courses.length > 0) {
            setIsCourseRegistered(true);
        }

        // Şagird qeydiyyatını yoxlayın
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        if (students.length > 0) {
            setIsStudentRegistered(true);
        }
    }, []);

    return (
        <div>
            <h1>Orta Məktəb İmtahan Qeydiyyat Proqramı</h1>
            {/* Register Courses */}
            <section style={{ marginBottom: '40px' }}>
                <h2>Dərs Qeydiyyatı</h2>
                {/* Kurs qeydiyyatı yoxlanacaq və əgər kurs qeydiyyatı yoxdursa, yalnız CourseForm görünəcək */}
                <CourseForm setIsCourseRegistered={setIsCourseRegistered}  />
            </section>

            {/* Register Students */}
            <section style={{ marginBottom: '40px' }}>
               
                {/* Kurs qeydiyyatı varsa, həmçinin Şagird formunu göstəririk */}
                {isCourseRegistered && <StudentForm setIsStudentRegistered={setIsStudentRegistered}  />}
            </section>

            {/* Register Exams */}
            <section>
              
                {/* Əgər həm kurs, həm də şagird qeydiyyatı varsa, İmtahan formunu göstəririk */}
                {isCourseRegistered && isStudentRegistered && <ExamForm />}
            </section>
        </div>
    );
};

export default MainComponent;
