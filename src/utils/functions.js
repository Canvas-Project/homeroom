module.exports = {

//This takes in the time passed in from the db and returns only the hours
getHours(time) {
    let splitTime = time.split('')

    let splitHours = []
    if (splitTime[0] > 0) {
      splitHours.push(splitTime[0])
      splitHours.push(splitTime[1])
    } else splitHours.push(splitTime[1])

    let hours = parseInt((splitHours.join('')), 10)
    // hours = hours - 6
    return hours

},
 //This takes in the time passed in from the db and returns only the minutes
getMinutes(time) {
    let splitTime = time.split('')

    let splitMinutes = []
    if (splitTime[3] > 0) {
      splitMinutes.push(splitTime[3])
      splitMinutes.push(splitTime[4])
    } else splitMinutes.push(splitTime[4])
    let minutes = parseInt(splitMinutes.join(''), 10)
    return minutes
  },
  changeToString(slotInfo){
      return slotInfo.toString()
  },
  getHoursList(){
    let hoursArray =[]
    for (let i = 0; i<24; i++){
      hoursArray.push(i)
    }
    return hoursArray;
  },
  checkIsEqual(param1, param2){
      return (param1 === param2)
  },
  concatenateDate(year, month, day){
      return `${year}-${month+1}-${day}`
  },
  filterSorted(sorted){
    return sorted.filter(e=> Date.parse(e.due_date) >= new Date().getTime())
  }








}