import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, getTeacher} from '../../../redux/user';


class TeachAssignments extends Component {
    constructor(){
        super()
        this.state={
              selectedCourse:''
            , courseName:''
        }
    }
    render(){
        let teacher = this.props.teacher;
        // let courseSelection  = this.state.selectedCourse;
        let courses = teacher.getCourses.map((e,i)=>{return <button className="stud_button" onClick={()=>this.setState({selectedCourse:e.course_id,courseName:e.course_name})} key={i}>{e.course_name}</button>});
        // let topics  = teacher ? teacher.template.filter((e,i)=> e.template_course_id === courseSelection).map((e,i)=>{return <div key={i}>{e.assignment_template_topic}</div>}): ''

        return (
          

          <div id="admin-home" className="course-container">     

              <div className="left-column">
                <h1 className="horizontal-line" style={{textAlign: 'center', width: '100%'}}>Select a course</h1>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    {courses}
                  </div>
              </div>
       
            <div className="right-column">
                <h1 className="horizontal-line">View Assignments for {this.state.courseName}</h1>
                <p>Select Course To View Assignments</p>
            </div>
        </div> 
        )
    }
}

function mapStateToProps(state){
    return{
          user: state.user
        , teacher: state.teacher
        , template: state.template
    }
}
export default connect(mapStateToProps, {getUser, getTeacher})(TeachAssignments);