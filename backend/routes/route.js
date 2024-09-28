const express = require('express');
//const { createAdmin, uploadMarks, loginAdmin } = require('../controllers/adminController');
const router = express.Router();
const cors =require('cors')
const {test}=require('../middleware/test')
const adminRoutes = require('./adminRoutes');
const studentRoutes = require('./studentRoutes');

router.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
    })
)

router.get('/',test)
router.use('/api/admin', adminRoutes);
router.use('/api/student', studentRoutes);
module.exports = router;