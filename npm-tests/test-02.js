//@ts-check
/** 
 * run from root folder as : node ./npm-tests/test-02.js
 * 
 * Parse the response from the given REST end point and print out "hobbies" property in the following format: ITEM1, ITEM2, ...
 */
import https from "https";


https
.get('https://coderbyte.com/api/challenges/json/rest-get-simple', (resp) => {
    let data = "";
    // console.log(resp);
    resp.on('data', function (chunk) {
        data += chunk;
    });
    resp.on('end', function() {
        // console.log('ended', JSON.parse(data));
        let result = JSON.parse(data);
        let resultToPrint = {};
        result.hobbies.forEach((hobby,index) => {
            resultToPrint[`ITEM ${index+1}`] = hobby;
        });
        console.log(resultToPrint);
        console.log('resultToPrint');
    });
    // parse json and print "hobbies" property as ITEM1, ITEM2,...
})
.on('error', function(e) {
    console.log("Got error: " + e.message);
});