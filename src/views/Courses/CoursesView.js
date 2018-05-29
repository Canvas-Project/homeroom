import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/user';
import Courses from '../../components/Student/Courses/Courses';
import CourseAssignment from '../../components/Student/Courses/CourseAssignment';
import TeacherCourses from '../../components/Administrator/Courses/Courses.js';

class CoursesView extends Component {
    render() {
        const currentPath = document.location.hash;
        let accountType = this.props.user.account_type;
        let currentCourse = ((currentPath === '#/courses') ? <Courses/> :
                            (currentPath === '#/courses/assignments') ? <CourseAssignment/> : '')
        return (
            accountType === "Administrator" ? <TeacherCourses />:
            accountType === "Teacher" ? 'Heyo':
            accountType === "Parent"? 'Hola': 
            accountType === "Student" ? currentCourse:''
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}
export default connect(mapStateToProps, {getUser})(CoursesView);