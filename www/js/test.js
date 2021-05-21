const request = require('request');

const options = {
    url: "http://localhost:5000/command",
    json: true,
    body: {
        "x": 2,
        "y": 4
    }
};

request.post(options, (err, res, body) => {

    if (err) {
        return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
});

// const axios = require('axios');
//
// axios.post("http://localhost:5000/command",
//     {
//         "x": 2,
//         "y": 4
//     }
// )
//   .then(function (response) {
//     console.log(response);
//   })
// //   .catch(function (error) {
// //     console.log(error);
//   });
