import { getAllSubjectsWithCourses } from "../services/subject-service.js"
import { deleteCourseStudentRecord, getAllStudent, addCourseandStudent, updateData } from "../services/subject-service.js"

export async function getSubject(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sortBy = req.query.sortBy || 'id';
        const sortOrder = req.query.sortOrder || 'asc';

        const result = await getAllSubjectsWithCourses(
            page,
            limit,
            sortBy,
            sortOrder
        )

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    } 
}

export async function deleteCourseStudent(req, res) {
    try {
    const courseId = parseInt(req.params.courseId)
    const studentId = parseInt(req.params.studentId)

    if (isNaN(courseId) || isNaN(studentId)) {
        throw new Error("Invalid course ID or student ID")
    }

    await deleteCourseStudentRecord(courseId, studentId)

    res.status(200).json("Course student deleted successfully");
    } catch (err) {
        if (err.message === 'Not found') {
            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
        res.status(500).json(err)
    }
}

export async function getStudents(req, res, next) {
    try {
        const students = await getAllStudent();
        res.json(students);
    } catch (err) {
        next(err);
    }
}

export async function addnewCourseandStudent(req, res) {
    try {
        const courseId = parseInt(req.params.courseId);
        const studentId = parseInt(req.params.studentId);
        const grades = parseFloat(req.body.grade);

        if (isNaN(courseId) || isNaN(studentId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid courseId or studentId'
            });
        }

        const course = await addCourseandStudent(courseId, studentId, grades);

        return res.status(201).json({
            success: true,
            data: course
        });

    } catch (err) {
        if (err.message === "already declare") {
            return res.status(409).json({
                success: false,
                message: err.message
            });
        }

        return res.status(500).json({ 
            success: false,
            message: err.message 
        });
    }
}

export async function putCourseStudent(req, res) {
    try {
        const courseId = Number(req.params.courseId);
        const studentId = Number(req.params.studentId);
        const grades = Number(req.body.grade);
        if (!courseId || !studentId) {  
            return res.status(400).json({ message: "Invalid courseId or studentId" })
        }

        if (Number.isNaN(grades)) {
            return res.status(400).json({ message: "Invalid grade" });
        }

        const course = await updateData(courseId, studentId, grades)

        return res.status(200).json({
            success: true,
            data: course
        });
    } catch (err) {
        return res.status(500).json({ 
            success: false,
            message: err.message 
        });
    }
}