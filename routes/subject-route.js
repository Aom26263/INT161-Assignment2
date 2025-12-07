import { getSubject, deleteCourseStudent, getStudents, addnewCourseandStudent, putCourseStudent } from "../controllers/subject-controller.js"
import express from 'express'

const router = express.Router();

router.get('/subjects', getSubject)
router.delete('/students/:studentId/courses/:courseId', deleteCourseStudent)
router.get('/students', getStudents)
router.post('/students', addnewCourseandStudent)
router.put('/students/:studentId/courses/:courseId', putCourseStudent)


export default router;
