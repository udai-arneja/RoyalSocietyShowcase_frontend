
/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
 function Restart(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    webgazer.clearData();
    ClearCalibration();
    PopUpInstruction();
};

function test(){
    const request = require('request');
    request.post({url: 'http://localhost:5000/command', json:true, body:{"x":0}}, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    });
};


window.onload = async function() {

    webgazer.params.showVideoPreview = true;
    //start the webgazer tracker
    await webgazer.setRegression('ridge') /* currently must set regression and tracker */
        //.setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {

            if (data!= null){

                x = Object.values(data)[0]
                y = Object.values(data)[1]
                coords = {
                    "x": x,
                    "y": y
                }
                test()
                // postData(coords)
                console.log(Object.values(data)[0]);
                // console.log(picked);
            }
            else{
                console.log("null via message");
            }
            // console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
            // console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .saveDataAcrossSessions(true)
        .begin();
        webgazer.showVideoPreview(true) /* shows all video previews */
            .showPredictionPoints(true) /* shows a square every 100 milliseconds where current prediction is */
            .applyKalmanFilter(true); /* Kalman Filter defaults to on. Can be toggled by user. */

    //Set up the webgazer video feedback.
    var setup = function() {

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        var canvas = document.getElementById("plotting_canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
    };
    setup();

};

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function() {
    webgazer.end();
}



// import axios from 'axios';


// function postData (coordinates){
//     axios.post("http://localhost:5000/command", 
//         {
//             "x": 2,
//             "y": 4
//         }
//     )
//     // .then(function (response) {
//     //     console.log(response);
//     // })
//     // .catch(function (error) {
//     //     console.log(error);
//     // });

// }