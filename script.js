/*-------------UI Controller-----------*/
const uiController = (() => {
  let b = 5, s = 25;
  
  return {
      uiChange: (input, flag) => {
          switch(input) {
              case "menusBtime":
                  if(flag) {
                    b > 1 ? b-- : b = b;
                    document.querySelector("#bTime").innerHTML = b; 
                  } 
                  break;
         
              case "plusBtime":
                  if(flag) {
                    b < 518400 ? b++ : b = b;
                    document.querySelector("#bTime").innerHTML = b;   
                  }
                  break;
         
              case "menusStime":
              console.log(s);
                  if(flag) {
                     s > 1 ? s-- : s = s;
                    document.querySelector("#sTime").innerHTML = s;
                    document.querySelector("#time").innerHTML = s;  
                  } 
                  break;
          
              case "plusStime":
              console.log(s);
                  if(flag) {
                     s >= 1 ? s++ : s = s;
                    document.querySelector("#sTime").innerHTML = s;
                    document.querySelector("#time").innerHTML = s;  
                  } 
                  break;
                  
              case "reset":
                  document.querySelector("#sTime").innerHTML = 25;
                  document.querySelector("#bTime").innerHTML = 5;
                  document.querySelector("#time").innerHTML = 25;
                  b = 5;
                  s = 25;
                  break;
          }
          
        return {
           session: s,
           break: b
        };
      }
  };
})();
/*-------------/UI COntroller-----------*/

/*-------------Time Controller-----------*/
const timeController = (() => {
  let bCounter = 0, bPerCounter = 0, sCounter = 0, sPerCounter = 0, seHour, seMin, seSec = 60, bHour, bMin, bSec = 60, print, nIntervId;
   
  return {
    startInterval: (sessionT, breakT, pause, reset) => {
        document.querySelector("#start").innerHTML = "Start";
        let session = sessionT * 60, breakTime = breakT * 60;
        
        if(!reset) {
            const start = () => {
                if(sCounter < session) {
                    sCounter++;
                    console.log(session);
                    console.log(sCounter);
                    sPerCounter += 100/session; 
                    document.querySelector("#progress").style.background = "linear-gradient(to top, #206C31 "+sPerCounter+"%,transparent "+sPerCounter+"%, transparent 100%)";
                    document.querySelector("#seOrBreak").innerHTML = "Session";
                    seSec--;
                    seHour = parseInt(((session - sCounter)/60)/60, 10);
                    console.log(seHour);
                    seHour > 0 ? seMin = parseInt(((session - sCounter)/60) % 60, 10) : seMin = parseInt((session - sCounter)/60, 10);
                    console.log(seMin);
                    seSec < 10 ? seSec = "0"+seSec : seSec = seSec;
                    seHour === 0 ? print = seMin + ":" + seSec : print = seHour + ":" + seMin + ":" + seSec;
                    document.querySelector("#time").innerHTML = print;
                    seSec === 0 ? seSec = 60 : seSec = seSec; 
                } else if(bCounter < breakTime) {
                    bCounter++;
                    console.log(bCounter);
                    bPerCounter += 100/breakTime; 
                    document.querySelector("#progress").style.background = "linear-gradient(to top, #D62E3D "+bPerCounter+"%,transparent "+bPerCounter+"%, transparent 100%)";
                    document.querySelector("#seOrBreak").innerHTML = "Break";
                    bSec--;
                    bHour = parseInt(((breakTime - bCounter)/60)/60, 10);
                    bHour > 0 ? bMin = parseInt(((breakTime - bCounter)/60) % 60, 10) : bMin = parseInt((breakTime - bCounter)/60, 10);
                    bSec < 10 ? bSec = "0"+bSec : bSec = bSec;
                    bHour === 0 ? print = bMin + ":" + bSec : print = bHour + ":" + bMin + ":" + bSec;
                    document.querySelector("#time").innerHTML = print;
                    bSec === 0 ? bSec = 60 : bSec = bSec; 
                } else {
                    sCounter = 0;
                    bCounter = 0;
                    sPerCounter = 0;
                    bPerCounter = 0;
                    seSec = 60; 
                    bSec = 60;
                }   
            }

            if(!pause) {
                const clock = (() => {
                    nIntervId = setInterval(start, 1000);
                })();
            } else {
                document.querySelector("#start").innerHTML = "Resume";
                clearInterval(nIntervId);
            } 
        } else {
            sCounter = 0;
            bCounter = 0;
            sPerCounter = 0;
            bPerCounter = 0;
            seSec = 60; 
            bSec = 60;
            clearInterval(nIntervId);
            document.querySelector("#progress").style.background = "linear-gradient(to top, #206C31 "+sPerCounter+"%,transparent "+sPerCounter+"%, transparent 100%)";
            document.querySelector("#progress").style.background = "linear-gradient(to top, #D62E3D "+bPerCounter+"%,transparent "+bPerCounter+"%, transparent 100%)";
        }
        
    }
  };
  
})();
/*-------------/Time Controller-----------*/

/*-------------App Controller-----------*/
const controller = ((uiCtrl, timeCtrl) => {
    let time, stime = 25, bTime = 5, pause = false, changeUiTime = true, startFlag = false, reset = false;
    
    let setupEventListeners = () => {
        document.addEventListener("click", event => {
            switch(event.target.id) {
                          
                case "menusBtime":
                    time = ctrlUi("menusBtime", changeUiTime);
                    stime = time.session;
                    bTime = time.break;
                    break;

                case "plusBtime":
                    time = ctrlUi("plusBtime", changeUiTime);
                    stime = time.session;
                    bTime = time.break;
                    break;

                case "menusStime":
                    time = ctrlUi("menusStime", changeUiTime);
                    stime = time.session;
                    bTime = time.break;
                    break;

                case "plusStime":
                    time = ctrlUi("plusStime", changeUiTime);
                    stime = time.session;
                    bTime = time.break;
                    break;

                case "start":
                    if(!startFlag) {
                        pause = false;
                        ctrlTime(stime, bTime, pause);
                        changeUiTime = false;
                        startFlag = true;
                        reset = false;
                    }
                    break;

                case "pause":
                    if(startFlag){
                        pause = true;
                        ctrlTime(stime, bTime, pause);
                        startFlag = false;
                    }
                    break;
                    
                case "reset":
                    reset = true;
                    stime = 25;
                    bTime = 5;
                    changeUiTime = true;
                    startFlag = false;
                    pause = false;
                    ctrlUi("reset", changeUiTime);
                    ctrlTime(stime, bTime, pause, reset);
                    break;
        
            }
        });
    };
    
    let ctrlUi = (inputUi, flag) => uiCtrl.uiChange(inputUi, flag);
  
    let ctrlTime = (sessionTime, breakTime, pause, reset) => timeCtrl.startInterval(sessionTime, breakTime, pause, reset); 
  
    return {
        init: () => {
            console.log("Application has started");
            setupEventListeners(); //waiting for buttons to be clicked
        }
    };
})(uiController, timeController);
/*-------------/App Controller-----------*/

/*--------Controller Init----------*/
controller.init();
/*--------/Controller Init---------*/