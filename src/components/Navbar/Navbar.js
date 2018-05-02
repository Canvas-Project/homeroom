import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Navbar.css'
import {connect} from 'react-redux';
import {getUser, getAdmin, getStudent, getParent, getTeacher, selectedCourse} from '../../redux/user';
import CoursesModal from './CouresModal/CoursesModal.js';

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            secondaryNav: ''
        }
      this.handleUpdateSecondaryNav = this.handleUpdateSecondaryNav.bind(this);
    } 

    componentWillMount(){
        this.props.getUser().then(()=>{
            let adminData = this.props.user.account_type === "Administrator" ? this.props.getAdmin(): "Wrong User"
            let studentData = this.props.user.account_type === "Student" ? this.props.getStudent() : "Wrong User"
            let parentData = this.props.user.account_type === "Parent" ? this.props.getParent() : "Wrong User"
            let teacherData = this.props.user.account_type === "Teacher" ? this.props.getTeacher() : "Wrong User"
            Promise.all([adminData, studentData, parentData, teacherData]).then(res=>{
                return res
            }).catch(err=>console.log(err))
        })
    }

    handleMobileCollapse() {
      const checkbox = document.getElementById('menu-btn')
      checkbox.checked = false;
    }

    handleShowCoursesModal() {
      //CLOSE MODAL
      document.getElementById('courses-modal').style.display = "block";
    }

    handleHideCoursesModal() {
      //CLOSE MODAL
      document.getElementById('courses-modal').style.display = "none";
    }

    handleUpdateSecondaryNav() {
      this.setState({secondaryNav: 'courses'});
      this.handleHideCoursesModal();
    }

    render() {
      let accountType = this.props.user.account_type;
    //   let {secondaryNav} = this.state;
      let path = document.location.pathname;
      // let currentCourse = this.props.currentCourseID 

      //REMOVE MODAL WHEN AREA OUTSIDE OF MODAL IS CLICKED
      window.onclick = (e) => {
        const modal = document.getElementById('courses-modal');
        if (e.target === modal) {
          this.handleHideCoursesModal();
        }
      }

        return (
            <nav>
                <header className="header">
                    <Link to="/home" className="h-logo" type="home">H</Link>
                    <input className="menu-btn" type="checkbox" id="menu-btn" />
                    <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                    <ul className="menu">

                        {/*SHOW FOR ALL USERS*/}
                        <li onClick={this.handleMobileCollapse}>
                            <Link to='/home' className={path === '/home' ? "selected" : null}
                            onClick={() => this.setState({secondaryNav: 'home'})}>Home</Link>
                        </li>

                        {/*SHOW FOR ADMINISTATORS*/}
                        {accountType === "Administrator" ? 
                        <li onClick={this.handleMobileCollapse}>
                            <Link to='/teachers' className={path === '/teachers' ? "selected" : null}
                            onClick={() => this.setState({secondaryNav: 'teachers'})}>Teachers</Link>
                        </li>
                        : ''}

                        {/*SHOW FOR ADMINISTATORS, TEACHERS, PARENTS*/}
                        {accountType !== "Student" ? 
                        <li onClick={this.handleMobileCollapse}>
                            <Link to='/students' className={path === '/students' ? "selected" : null}
                            onClick={() => this.setState({secondaryNav: 'students'})}>Students</Link>
                        </li>
                        : ''}

                        {/*SHOW FOR ADMINISTATORS*/}
                        {accountType === "Administrator" ? 
                        <li onClick={this.handleMobileCollapse}>
                            <Link to='/parents' className={path === '/parents' ? "selected" : null}
                            onClick={() => this.setState({secondaryNav: 'parents'})}>Parents</Link>
                        </li>
                        : ''}

                        {/*SHOW FOR STUDENTS*/}
                        {accountType === "Student" ? 
                        <li onClick={this.handleMobileCollapse}>
                            <Link to='/dashboard' className={path === '/dashboard' ? "selected" : null}
                            onClick={() => this.setState({secondaryNav: 'dashboard'})}>Dashboard</Link>
                        </li>
                        : ''}

                        {/*SHOW FOR ADMINISTATORS*/}
                        {accountType === "Administrator" ? 
                        <li onClick={this.handleMobileCollapse}>
                            <Link to='/courses' className={path === '/courses' ? "selected" : null}
                            onClick={() => this.setState({secondaryNav: 'courses'})}>Courses</Link>
                        </li>
                        : ''}

                        {/*SHOW FOR STUDENTS*/}
                        {accountType === "Student" ? 
                        <li onClick={this.handleMobileCollapse}>
                            <a className={path === '/courses' ? "selected" : null}
                            onClick={() => {
                              this.handleShowCoursesModal();
                            }
                          }>Courses</a>
                        </li>
                        : ''}

                        {/*SHOW FOR TEACHER*/}
                        {accountType === "Teacher" ? 
                        <li onClick={this.handleMobileCollapse}>
                            <Link to='/assignments' className={path === '/assignments' ? "selected" : null}
                            onClick={() => this.setState({secondaryNav: 'assignments'})}>Assignments</Link>
                        </li>
                        : ''}

                        {/*SHOW FOR TEACHERS, STUDENTS, PARENTS*/}
                        {accountType !== "Administrator" ? 
                        <li onClick={this.handleMobileCollapse}>
                            <Link to='/calendar' className={path === '/calendar' ? "selected" : null}
                            onClick={() => this.setState({secondaryNav: 'calendar'})}>Calendar</Link>
                        </li>
                        : ''}

                        {/*
                        SHOW FOR ADMINISTATORS
                        accountType === "Administrator" ? 
                        <li onClick={this.handleMobileCollapse}>
                            <Link to='/metrics' className={path === '/metrics' ? "selected" : null}
                            onClick={() => this.setState({secondaryNav: 'metrics'})}>Metrics</Link>
                        </li>
                        : ''
                        */}

                        {/*SHOW FOR ALL USERS*/}
                        <li onClick={this.handleMobileCollapse}>
                            <Link to='/account' className={path === '/account' ? "selected" : null}
                            onClick={() => this.setState({secondaryNav: 'myAccount'})}>My Account</Link>
                        </li>

                        {/*SHOW FOR ALL USERS*/}
                        <li onClick={this.handleMobileCollapse}>
                            <a href={process.env.REACT_APP_LOGOUT}>Logout</a>
                        </li>
                    </ul>
                </header>

                <div className="secondary-menu">
{/*======== GLOBAL SECONDARY NAVIGATION OPTIONS ========*/}
                    {/*SHOW FOR ALL USERS*/}
                    {document.location.hash === '#/home' && 
                    <ul><li>{`Welcome back, ${this.props.user.first_name}!`}</li></ul> }

                    {/*SHOW FOR ALL USERS*/}
                    {document.location.hash === '#/account'
                    && 
                    <ul><li><Link to='/account'>Account Settings</Link></li></ul>}

{/*======== ADMINISTRATOR SECONDARY NAVIGATION OPTIONS ========*/}
                    {/*TEACHRERS VIEW FOR ADMINISTRATORS*/}
                    {((document.location.hash === '#/teachers' || document.location.hash === '#/teachers/create-teacher') && accountType === "Administrator") && 
                    <ul>
                        <li><Link to='/teachers'>View Teachers</Link></li>
                        <li><Link to='/teachers/create-teacher'>Create Teacher</Link></li>
                    </ul> }

                    {/*STUDENTS VIEW FOR ADMINISTRATORS*/}
                    {((document.location.hash === '#/students' || document.location.hash === '#/students/create-student') && accountType === "Administrator") &&
                    <ul>
                        <li><Link to='/students'>View Students</Link></li>
                        <li><Link to='/students/create-student'>Create Student</Link></li>
                    </ul> }

                    {/*PARENTS VIEW FOR ADMINISTRATORS*/}
                    {((document.location.hash === '#/parents' || document.location.hash === '#/parents/create-parent') && accountType === "Administrator") && 
                    <ul>
                        <li><Link to='/parents'>View Parents</Link></li>
                        <li><Link to='/parents/create-parent'>Create Parent</Link></li>
                    </ul> }

                    {/*COURSES VIEW FOR ADMINISTRATORS*/}
                    {(document.location.hash === '#/courses' && accountType === "Administrator") &&
                    <ul>
                        <li><Link to='/courses'>View Courses</Link></li>
                        <li><Link to='/courses/create-course'>Create Course</Link></li>
                    </ul>}

                    {/*
                    METRICS VIEW FOR ADMINISTRATORS
                    (document.location.pathname === '/metrics' && accountType === "Administrator") &&
                    <ul>
                        <li><Link to='/courses'>View Metrics</Link></li>
                    </ul>
                    */}

{/*======== TEACHER SECONDARY NAVIGATION OPTIONS ========*/}
                    {/*STUDENTS VIEW FOR TEACHERS*/}
                    {(document.location.hash === '#/students' && accountType === "Teacher") &&
                    <ul>
                        <li><Link to='/students'>View Students</Link></li>
                    </ul> }

                    {/*COURSES VIEW FOR TEACHERS*/}
                    {(document.location.hash === '#/courses' && accountType === "Teacher") &&
                    <ul>
                        <li><Link to='/courses'>View Courses</Link></li>
                        <li><Link to='/courses/grades'>Grades</Link></li>
                    </ul>}

                    {/*COURSES VIEW FOR TEACHERS*/}
                    {(document.location.hash === '#/assignments' && accountType === "Teacher") &&
                    <ul>
                        <li><Link to='/assignments'>View All</Link></li>
                        <li><Link to='/assignments/assign-assignment'>Assign</Link></li>
                        <li><Link to='/assignments/create-assignment'>Create</Link></li>
                    </ul>}

                    {/*CALENDAR VIEW FOR TEACHERS*/}
                    {(document.location.hash === '#/calendar' && accountType === "Teacher") &&
                    <ul>
                        <li><Link to='/calendar'>View Calendar</Link></li>
                    </ul>}

                    
{/*======== STUDENT SECONDARY NAVIGATION OPTIONS ========*/}
                    {/*COURSES VIEW FOR STUDENTS*/}
                    {(document.location.hash === '#/dashboard' && accountType === "Student") &&
                    <ul></ul> }

                    {/*COURSES VIEW FOR STUDENTS*/}
                    {(document.location.hash === '#/courses' && accountType === "Student") &&
                    <ul>
                        <li><Link to="/courses">Course Home</Link></li>
                        <li><Link to='/courses/assignments'>View Assignments</Link></li>
                    </ul>}

                    {/*CALENDAR VIEW FOR STUDENTS*/}
                    {(document.location.hash === '#/calendar' && accountType === "Student") &&
                    <ul>
                        <li><Link to='/calendar'>View Calendar</Link></li>
                    </ul>}
                    

{/*======== PARENT SECONDARY NAVIGATION OPTIONS ========*/}
                    {/*STUDENTS VIEW FOR PARENTS*/}
                    {(document.location.hash === '#/students' && accountType === "Parent") &&
                    <ul>
                        <li><Link to='/students'>View Students</Link></li>
                    </ul> }

                    {(document.location.hash === '#/courses' && accountType === "Parent") &&
                    <ul>
                        <li><Link to='/calendar'>View Calendar</Link></li>
                    </ul>}

                </div>

                <CoursesModal updateSecondNav={this.handleUpdateSecondaryNav}/>
            </nav>
        )
    }
}
// =========== MAP STATE TO PROPS ======
function mapStateToProps(state){
    return{
          user: state.user
        , admin: state.admin
        , student: state.student
        , parent: state.parent
        , teacher: state.teacher
        , currentCourseID:state.currentCourseID
    }
}

export default connect(mapStateToProps, {getUser, getAdmin, getStudent, getParent, getTeacher, selectedCourse})(Navbar);