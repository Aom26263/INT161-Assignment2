import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export async function getAllsubject(skip = 0, take = 10, orderBy = { id: "asc" }) {
    const subjects = await prisma.subjects.findMany({
        skip,
        take,
        orderBy,
        include: {
            courses: true
        }
    })
    return subjects;
}

export async function getAllStudentWithCourse() {
    return await prisma.course_student.findMany();
}

export async function selectCourseWithId(courseId, studentId) {
    return await prisma.course_student.findUnique({
        where: {
            course_id_student_id : {
                course_id: courseId,
                student_id: studentId
            }
        }
    })
}

export async function deleteCourseStudent(courseId, studentId) {
    return await prisma.course_student.delete({
        where: {
            course_id_student_id : {
                course_id: courseId,
                student_id: studentId
            }
        }
    })
}

export async function createCourseStudent(courseId, studentId, grades ) {
    return await prisma.course_student.create({
        data: {
            course_id: courseId,
            student_id: studentId,
            grade: grades 
        }
    })
}

export async function updateCourseStudent(courseId, studentId, grades) {
    return await prisma.course_student.update({
        where: {
            course_id_student_id: {
                course_id: courseId,
                student_id: studentId
            }
        },
        data: {
            grade: grades
        }
    })
}