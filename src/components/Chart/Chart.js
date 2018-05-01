import React, { Component } from 'react';
import { Bar, Line, HorizontalBar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { getUser, getStudent } from '../../redux/user';
import LoadData from '../../components/LoadData/LoadData';
import * as functions from '../../utils/functions'
import _ from 'underscore';
//CSS, ASSETS
import './Chart.css'
class Chart extends Component {
    constructor() {
        super()
        this.state = {
            selectedCourseID: -1,
            selectedCourse: '',
            windowWidth: -1,
            selectedAssignmentTemplateID:-1,
            averagePeerScores:[],
            chartType:'Bar'
        }
        this.selectCourse = this.selectCourse.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount(){
        this.setState({ windowWidth: window.innerWidth});
    }
    updateWindowDimensions(){
        window.addEventListener('resize', this.updateWindowDimensions);
        // this.setState({ windowWidth: window.innerWidth});
    }

    selectCourse(courseValues) {

        this.setState({
            selectedCourseID: courseValues[0],
            selectedCourse: courseValues[1]
        })
        let assignmentTemplateIDs = this.props.student.getAssignments ? this.props.student.getAssignments.map(obj => {
            if (obj.student_assignments_course_id === courseValues[0]){ return obj.assignment_template_id } else return null
        }).filter(value => value):[] 


        let peerScores = assignmentTemplateIDs.map(idToMap => {

                return this.props.student.classAverage.map(obj => {

                    //if(functions.checkIsEqual(obj.assignment_template_id, idToMap))
                 
                    if(functions.checkIsEqual(obj.assignment_template_id, idToMap)){
                        return obj.classmates_points_earned
                    } else return null
                }).filter(value => value)
        })
        let assigmentAverages = peerScores.map(scoreArray =>{
            return scoreArray.length > 0 ? scoreArray.reduce((accu, curr) => accu + curr)/scoreArray.length : []
        })
        
        this.setState({
            averagePeerScores:assigmentAverages
        })

    }

    render() {
        let chartTitleFont = (this.state.windowWidth > 1024) ? 30 : (this.state.windowWidth > 375) ? 20 : 10;
// =========== CURRENT STUDENT DATA ============
        let studentData = this.props.student;
// ====== DISPLAY BUTTONS TO SELECT CHART ======
        let buttonType = ["V-Bar", "Line", "H-Bar"];
        let chartButtons = buttonType.map((element, index) => {
            return <button className="course_btn" key={index} id={`course_button${index}`} onClick={() => {this.setState({chartType:element})}}>{element}</button>
        })
// ====== FIND STUDENT ASSIGNMENTS SCORES ======
        let studentAssignmentScores = studentData.getAssignments ? studentData.getAssignments.map(obj => {
            if (obj.student_assignments_course_id === this.state.selectedCourseID){ return (obj.points_earned / obj.possible_points)*100} else return null
        }).filter(value => value):[]

// ============ FIND ASSIGNMENTS ID ============
        let assignmentIDs = studentData.getAssignments ? studentData.getAssignments.map(obj => {
            if (obj.student_assignments_course_id === this.state.selectedCourseID){ return obj.student_assignment_id } else return null
        }).filter(value => value):[]
// =========== FIND ASSIGNMENTS NAME ===========
        let assignmentNames = studentData.getAssignments ? (assignmentArray)=> studentData.getAssignments.map(obj => {
            if (assignmentArray.indexOf(obj.student_assignment_id) > -1 && obj.points_earned){ return obj.assignment_name} else return null
        }).filter(value => value):(placeholder)=>{return []}
// =========== FIND STUDENT COURSES ===========
        var studentCourses = studentData.getCourses ?             
        studentData.getCourses.map(value => {return { courseID: value.course_id, courseName: value.course_name }}) :[]
// ========= DISPLAY COURSE BUTTONS ===========
        let courseButtons = _.uniq(studentCourses).map((element, index) => {
            return <button className="course_btn" key={index} value={element.courseID} onClick={(e) => {this.selectCourse([element.courseID, element.courseName])}}>{element.courseName}</button>
        })
 // ================ CHART DATA ===============   
        let chartData = {
              labels: assignmentNames(assignmentIDs)
            , type: 'polarArea'
            , datasets: [{
                 label: 'Average Score'
                , data: this.state.averagePeerScores
                , backgroundColor: 'rgba(255, 206, 86, .8)'
            },{
                label: 'Student Score'
              , data: studentAssignmentScores
              , backgroundColor:'rgba(75, 192, 192, .8)'               
          }]
        }
 // ============= CHART OPTION DATA ============           
        let chartOptionData = {
            title: {
                  display: true
                , text: `${this.state.selectedCourse === '' ? "Please select a course" : `Assignment Scores for ${this.state.selectedCourse}`}`
                , fontSize: chartTitleFont
            },
            legend: {
                  display: true
                , position: 'top'
            }}
 // ======= DISPLAY BAR, LINE, and HORIZONTAL BAR CHARTS ========               
        let barChart =  studentData.getAssignments ? <Bar className="test_chart" data={chartData} options={chartOptionData}/>: <LoadData/>
        let lineChart = <Line className="test_chart" data={chartData} options={{chartOptionData}}/>
        let HorizontalBarChart = <HorizontalBar className="test_chart" data={chartData} options={chartOptionData}/>
 // ============= RETURN ============      
    return ( 

      <div id="admin-home" className="course-container">     

              <div className="left-column">
                  <h1 className="horizontal-line">Welcome to Homeroom</h1>
                  <p>All schools in the Salt Lake City District use Homeroom as the Learning Management System (LMS), which means all of your online courses will be in Homeroom. The course content will be available by the first day of classes.</p>
                  
                  
                  <h1 className="horizontal-line">Select Chart Type</h1>
                  <div className="chartButtonsWrapper">{chartButtons}</div>

                  <h1 className="horizontal-line">Recent Comments</h1>
                  <p className="gray">No Comments</p>
                  <h1 className="horizontal-line">Homeroom Recommendations</h1>
                  <p className="gray">None at this time</p>
              </div>
            <div className="right-column">
                    <div className="test_chart_wrapper">   
                        {this.state.chartType === "V-Bar" ? barChart: this.state.chartType === "Line" ? lineChart:this.state.chartType === "H-Bar" ? HorizontalBarChart : barChart}
                        {this.state.chartType !== '' ? <div className="coursesButtonsWrapper">{courseButtons}</div>: null}      
                    </div>
            </div>
        </div>     
        )
    }
}
function mapStateToProps(state) {
    return {
        user:state.user
        , student:state.student 
    }
}
export default connect(mapStateToProps, {getUser,getStudent})(Chart);