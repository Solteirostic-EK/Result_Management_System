const mongoose = require('mongoose');
const StudentMarks = require("../../models/studentModel"); 

const AssessmentUpload = async (req, res) => {
    try {
        const data = req.body;
         console.log("data")
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(400).send('No data provided.');
        }

        for (const record of data) {

           

            console.log(record)
            const keys = Object.keys(record);
             const [prn_no, semesterNumber, courseCode, courseName, test1Marks,test2Marks,fullMarksPerTest,theoryObtained,maxTheoryMarks,] = keys.map(key => record[key]);
            
            if (!prn_no) {
                console.error("PRN number is missing in the record.");
                
                continue; 
            }
            console.log("hu")

            let studentMarks = await StudentMarks.findOne({ prn_no });
            if (!studentMarks) {
                
                continue;
            }
            console.log("hu2")

            if (!studentMarks.assessment) {
                studentMarks.assessment = [];
            }

            let semester = studentMarks.assessment.find(sem => sem.semesterNumber === semesterNumber);
            console.log("hu3")

            if (!semester) {
                semester = {
                    semesterNumber,
                    courses: [] 
                };
                studentMarks.assessment.push(semester);
                await studentMarks.save();
            studentMarks = await StudentMarks.findOne({ prn_no });
            semester = studentMarks.assessment.find(sem => sem.semesterNumber === semesterNumber);
            }
            console.log("hu4")

            if (!Array.isArray(semester.courses)) {
                semester.courses = []; // Ensure courses is always an array
                console.log(`Initialized courses array for semester ${semesterNumber}`);
            }
            
            let course = semester.courses.find(crs => crs.courseCode === courseCode);

            if (!course) {
                course = {
                    courseCode,
                    courseName,
                    internalAssessment: {
                        firstTest: {
                            obtainedMarks: test1Marks || null
                        },
                        secondTest: {
                            obtainedMarks: test2Marks || null
                        },
                        fullMarksPerTest: fullMarksPerTest || 50, 
                    },
                    examinationScheme: {
                        theoryExam: {
                            obtainedMarks: theoryObtained || null
                        },
                        maxTheoryMarks: maxTheoryMarks  
                    },
                    
                };
                semester.courses.push(course)
                console.log(`Added new course ${courseCode} for semester ${semesterNumber} and PRN: ${prn_no}`);
            } else {
                course.courseName = courseName;
                course.internalAssessment.firstTest.obtainedMarks = test1Marks || course.internalAssessment.firstTest.obtainedMarks;
                course.internalAssessment.secondTest.obtainedMarks = test2Marks || course.internalAssessment.secondTest.obtainedMarks;
                course.internalAssessment.fullMarksPerTest = fullMarksPerTest || course.internalAssessment.fullMarksPerTest;
                course.examinationScheme.theoryExam.obtainedMarks = theoryObtained || course.examinationScheme.theoryExam.obtainedMarks;
                course.examinationScheme.maxTheoryMarks = maxTheoryMarks || course.examinationScheme.maxTheoryMarks;

                console.log(`Updated course ${courseCode} for semester ${semesterNumber} and PRN: ${prn_no}`);
            }


            console.log(studentMarks)
            await studentMarks.save();
            
        }

        res.status(200).send('Data processed successfully!');
    } catch (error) {
        console.error("Error processing data:", error);
        res.status(500).send('Error processing data.');
    }
};

module.exports = { AssessmentUpload };
