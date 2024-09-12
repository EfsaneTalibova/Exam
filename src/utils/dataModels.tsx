export interface Exam {
    courseCode: string;     // char(3)
    studentId: number;      // number(5,0)
    examDate: string;       // date
    grade: number;          // number(1,0)
}

export interface Student {
    studentId: number;      // number(5,0)
    firstName: string;      // varchar(30)
    lastName: string;       // varchar(30)
    classLevel: number;     // number(2,0)
    exams?: Exam[];

}

export interface Course {
    courseCode: string;   // char(3)
    courseName: string;   // varchar(30)
    classLevel: number;   // number(2,0)
    teacherFirstName: string;  // varchar(20)
    teacherLastName: string;   // varchar(20)
    students?: Student[];
}