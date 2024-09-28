const Result = require('../models/studentmarks');
const Student = require('../models/studentModel');
const nodemailer = require('nodemailer');
const branchCodes = {
    'Computer Engineering': 'CE',
    'Mechanical Engineering': 'ME',
    'Electronics Engineering': 'EE',
    // Add other branches as needed
};

async function generatePRN(joining_year, branch) {
    const branchCode = branchCodes[branch];
    const count = await Student.countDocuments({ joining_year, branch });
    const sequenceNumber = count + 1;
    const prn_no = `${joining_year}${branchCode}${String(sequenceNumber).padStart(3, '0')}`;
    return prn_no;
}
const createStudent = async (req, res) => {
    const { name, branch, joining_year, contactNumber, dateOfBirth, email, address } = req.body;

    // Input validation
    if (!name || !branch || !joining_year || !contactNumber || !dateOfBirth || !email || !address) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Validate contact number format (assuming it's 10 digits)
    const contactPattern = /^\d{10}$/;
    if (!contactPattern.test(contactNumber)) {
        return res.status(400).json({ error: 'Contact number must be 10 digits.' });
    }

    // Validate email format using a simple regex
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Generate PRN (Pseudo-Roll Number) based on joining year and branch
    const prn_no =await generatePRN(joining_year, branch);

    try {
        // Check if a student with the same PRN or email already exists
        const existingStudent = await Student.findOne({ $or: [{ prn_no }, { email }] });
        if (existingStudent) {
            return res.status(400).json({ error: 'A student with this PRN or email already exists.' });
        }

        const newStudent = new Student({
            prn_no, 
            name,
            branch,
            joining_year,
            email,
            contactNumber,
           
            dateOfBirth,
            address, // Include address
        });

        // Save new student to the database
        const savedStudent = await newStudent.save();

        // // Set up Nodemailer transporter
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail', // Use your email service provider
        //     auth: {
        //         user: 'your-email@gmail.com', // Replace with your email
        //         pass: 'your-email-password', // Replace with your email password or app-specific password
        //     },
        // });

        // // Email options
        // const mailOptions = {
        //     from: 'your-email@gmail.com', // Sender address
        //     to: email, // Send to student's email
        //     subject: 'Student Registration Confirmation',
        //     text: `Hello ${name},\n\nYour student account has been created successfully! Your PRN number is: ${prn_no}.\n\nBest regards,\nYour Institution`,
        // };

        // // Send email
        // await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'Student added successfully.', student: savedStudent });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Failed to create student.' });
    }
}




// Student login function
const loginStudent = async (req, res) => {
    const { prn_no } = req.body;

    try {
        const student = await Student.findOne({ prn_no });

        if (!student) {
            return res.status(400).json({ error: 'Invalid PRN No' });
        }

        res.json({ message: 'Login successful', student });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// API route to fetch student details by PRN No
const getStudent = async (req, res) => {
    const { prn_no } = req.params;

    try {
        const student = await Student.findOne({ prn_no });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ student });
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ error: 'Error fetching student data' });
    }
};

// Fetch student marks by their ID
const getStudentMarks = async (req, res) => {
    const { studentID } = req.params;

    try {
        const result = await Result.findOne({ studentID });

        if (!result) {
            return res.status(404).json({ message: 'No results found for this student' });
        }

        res.json(result);
    } catch (error) {
        console.error('Error fetching student marks:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createStudent, loginStudent, getStudent, getStudentMarks };
