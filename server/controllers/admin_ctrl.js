module.exports= {
    getTeachersForAdmin:((req,res,next)=>{
        const db = req.app.get('db')
        if(req.user){
            const {user_id} = req.user
            db.run(`SELECT 
                    user_id,
                    account_type,
                    username, first_name,
                    last_name,
                    email,
                    user_photo,
                    phone_number,
                    display_name 
                    FROM users
                    WHERE account_type = 'Teacher'`,
                function(err,res){
                    var teachers = res;
                }).then(teachers=>{
                    // console.log('Admins Teachers', teachers)
                    res.status(200).send(teachers)
                })
        }else{
            res.status(401).send('Please Sign-in.')
        }
    }),
    getStudentsForAdmin:((req,res,next)=>{
        const db = req.app.get('db')
        if(req.user){
            const {user_id} = req.user
            db.run(`SELECT 
                    user_id,
                    account_type,
                    username, first_name,
                    last_name,
                    email,
                    user_photo,
                    phone_number,
                    display_name 
                    FROM users
                    WHERE account_type = 'Student'`,
                function(err,res){
                    var students = res;
                }).then(students=>{
                    // console.log('Admins Students', students)
                    res.status(200).send(students)
                })
        }else{
            res.status(401).send('Please Sign-in.')
        }
    }),
    getParentsForAdmin:((req,res,next)=>{
        const db = req.app.get('db')
        if(req.user){
            const {user_id} = req.user
            db.run(`SELECT 
                    user_id,
                    account_type,
                    username, first_name,
                    last_name,
                    email,
                    user_photo,
                    phone_number,
                    display_name 
                    FROM users
                    WHERE account_type = 'Parent'`,
                function(err,res){
                    var parents = res;
                }).then(parents=>{
                    // console.log('Admins Parents', parents)
                    res.status(200).send(parents)
                })
        }else{
            res.status(401).send('Please Sign-in.')
        }
    }),
    getCoursesForAdmin:((req,res,next)=>{
        const db = req.app.get('db')
        if(req.user){
            const {user_id} = req.user
            db.run(`SELECT * 
                    FROM courses
                    JOIN users on users.user_id = courses.teacher_id
                    ORDER BY course_id;`,
                function(err,res){
                    var courses = res;
                }).then(courses=>{
                    // console.log('Admins Courses', courses)
                    res.status(200).send(courses)
                })
        }else{
            res.status(401).send('Please Sign-in.')
        }
    }),
    getStudentsPerCourse:((req,res,next)=>{
        const db = req.app.get('db')
        if(req.user){
            const {user_id} = req.user
            db.run(`SELECT courses.course_id, course_name, courses_photo, 
                    start_date, end_date, users.user_id, teacher_id, period, time, department, 
                    first_name, last_name, email, user_photo, phone_number 
                    FROM courses
                    JOIN roster ON courses.course_id = roster.roster_course_id
                    JOIN users ON roster.roster_user_id = users.user_id`,
                function(err,res){
                    var student = res;
                }).then(student=>{
                    // console.log('Admins student', student)
                    res.status(200).send(student)
                })
        }else{
            res.status(401).send('Please Sign-in.')
        }
    })
}