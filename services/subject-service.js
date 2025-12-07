import { getAllsubject }from "../repositories/subject-repository.js"
import { selectCourseWithId, deleteCourseStudent, getAllStudentWithCourse, createCourseStudent, updateCourseStudent } from "../repositories/subject-repository.js"

export async function getAllSubjectsWithCourses(page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc') {
    const skip = (page - 1) * limit
    const orderby = { [sortBy]: sortOrder }
    const subjects = await getAllsubject(
        skip,
        limit,
        orderby
    ) 

    return {
        data : subjects,
        pagination: {
            page,
            limit
        }
    }
}

export async function deleteCourseStudentRecord(courseId, studentId) {
    const coureStudent = await selectCourseWithId(courseId, studentId)
    if (!coureStudent) {
        throw new Error("Not found")
    }

    return await deleteCourseStudent(courseId, studentId)
}

export async function getAllStudent() {
    return await getAllStudentWithCourse();
}

export async function addCourseandStudent(courseId, studentId, grades ) {
    const courseStudent = await selectCourseWithId(courseId, studentId, grades )

    if (courseStudent) {
        throw new Error("already declare")
    }

    return await createCourseStudent(courseId, studentId, grades)
}

export async function updateData(courseId, studentId, grades) {
    const data = await selectCourseWithId(courseId, studentId, grades)
    if (!data) {
        return null
    }

    return await updateCourseStudent(courseId, studentId, grades)
}