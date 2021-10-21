
function Timer(nowDate) {
    var openDate = new Date('2021/11/29 00:00:00')
    // var openDate = goal
    var nowDate = Object.values(nowDate)[0]
   
    var diffTime = openDate.getTime() - nowDate.getTime();
    
    var timerDays = (diffTime-(diffTime % (1000*60*60*24)))/(1000*60*60*24);
    var timerHours = ((diffTime % (1000*60*60*24)) - ((diffTime % (1000*60*60*24)) % (1000*60*60))) / (1000*60*60)
    var timerMinutes = (((diffTime % (1000*60*60*24)) % (1000*60*60))-(((diffTime % (1000*60*60*24)) % (1000*60*60))%(1000*60))) / (1000*60)
    var timerSeconds = (diffTime % (1000*60) - (diffTime % (1000*60)) % 1000)/1000;

    return timerDays+" : "+timerHours+" : "+timerMinutes+" : "+timerSeconds;
}

export default Timer;