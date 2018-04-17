// ================== MODULES =================== 
require('dotenv').config();
const express = require('express')
   , bodyParser = require('body-parser')
   , massive = require('massive')
   , session = require('express-session')
   , passport = require('passport')
   , LocalStrategy = require('passport-local').Strategy
   , bcrypt = require('bcryptjs')
   , cors = require('cors')
// =============== CONTROLLERS ================
   , admin_ctrl = require('./controllers/admin_ctrl')
   , students_ctrl = require('./controllers/students_ctrl')
   
// ================ INVOKE EXPRESS ============= 
const app = express();
// ======== IMPORT VARIABLES FROM .env =========
const {
     SESSION_PORT
   , CONNECTION_STRING
   , SESSION_SECRET
   , REACT_APP_LOGOUT
   , REACT_APP_LOGIN_PAGE
}  = process.env;

// ============== MASSIVE DB CONNECTION ========
massive(CONNECTION_STRING).then(db => {
   app.set('db', db);
   app.listen(SESSION_PORT, () => console.log(`Listening on port ${SESSION_PORT}`))
})

// =============== AUTH / MIDDLEWARE ===========
app.use(bodyParser.json());
app.use( session({
     secret: SESSION_SECRET
   , resave: false
   , saveUninitialized: false
   , cookie: {maxAge:2000000}
}))

// ============ PASSPORT LOCAL STRATEGY =======
passport.use(new LocalStrategy(
   function(username, password, done) {
      app.get('db').get_user([username]).then(result => {
         const user = result[0];

         //VERIFY USERNAME EXISTS
         if(!user) {return done(null, 'Unauthorized')}

         // VERIFY PASSWORD MATCHES
         // const validPassword = bcrypt.compareSync(password, user.password);
         // if(!validPassword) return done(null, 'Unauthorized');

         //USER IS VERIFIED AND THEIR ID IS RETURNED
         return done(null, user)
      })
   }
))
// ============ SERIALIZE / DESERIALIZE ============
passport.serializeUser((user, done) => {
   return done(null, user);
})

passport.deserializeUser((user, done) => {
   if(user === 'Unauthorized') {
      return done(null, 'Unauthorized');
   }
      return done(null, user);
})

app.use(passport.initialize());
app.use(passport.session());


// ========== LOGIN & LOGOUT ENDPOINTS =========
app.post('/api/login', passport.authenticate('local'), (req, res, next) => {
   if(req.user === 'Unauthorized') {
      res.status(200).send(req.user)
   } else {
      res.redirect(200, '/home')
   }
   next();
})

app.get('/logout', (req,res) => {
   req.logout();
   res.redirect(REACT_APP_LOGIN_PAGE);
})

// =========== CONFIRM USER ENDPOINTS ==========
app.get('/auth/me', (req, res) => {
   if (req.user) {
      res.status(200).send(req.user);
   } else {
      res.status(401).send('Not Logged In');
   }
})

// ================== ENDPOINTS ================

// ****************** ADMINS *******************
//        ========== Teachers ========
const {getTeachers} = admin_ctrl
app.get('/getAdminTeacher', getTeachers);
//        ========== Students ========
const {getStudents} = admin_ctrl
app.get('/getAdminStudent', getStudents);
//        ========== Parents =========
const {getParents} = admin_ctrl
app.get('/getAdminParent', getParents);
//        ========== Courses =========
const {getCourses} = admin_ctrl
app.get('/getAdminCourse', getCourses);
// ****************** TEACHERS ******************
// ****************** PARENTS *******************
// ****************** STUDENTS ******************
//        ========== Courses ========
const {getStudentCourses} = students_ctrl
app.get('/getStudentCourses', getStudentCourses);
//        ========== Assignments ========
const {getStudentAssignments} = students_ctrl
app.get('/getStudentAssignments', getStudentAssignments);
//        ========== Attachments ========
const {getStudentAttachments} = students_ctrl
app.get('/getStudentAttachments', getStudentAttachments);