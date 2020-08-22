const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
app.use(express.json())
let jsonFile = require('jsonfile');
const fs = require('fs');
const { json } = require("body-parser");

let data = fs.readFileSync('dublicate.json');
let allData = JSON.parse(data);

app.get('/', (req, res) => {
    let emlist = [];
    allData.forEach(myFunction);
    function myFunction(item) {
        emlist.push(
            {
                id: item.id,
                name: item.name,
                description: item.description
            })
    }
    res.send(emlist);
})

// for courses
app.get('/course/:id', (req, res) => {

    let course_list = [];
    let course_id = req.params.id;
    let courses = allData[course_id - 1].submission;
    courses.forEach(course_data);
    function course_data(data) {

        course_list.push({
            id: data.id,
            name: data.name,
            description: data.description
        })

    }
    res.send(course_list);

})



// for comments
app.get('/course/:id/:cid/', (req, res) => {
    

    let id = req.params.id;
    let c_id = req.params.cid;
    let course_dict = allData[id - 1].submission
    let userSummision = course_dict[c_id - 1].usersummision;
    console.log(userSummision)
    res.send(userSummision);  
})


// for adding courses;
app.post('/post', (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let submission = req.body.submission;

    const data = {
        id:allData.length+1,
        name,
        description,
        submission
    }
    console.log(data)
    allData.push(data)
    res.send(data);

}) 

//  for adding new submission in particular course
app.post('/post/id/:id/usersummision', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let usersummision = req.body.usersummision;
    let courseid_data = allData[id-1].submission
    let courseid_len = courseid_data.length
    let courseid = courseid_len+1
    console.log(courseid)
    const data = {
        id:id,
        courseid,
        name,
        description,
        usersummision
    }
    let summision = allData[id-1].submission;
    console.log(data)
    summision.push(data)
    res.send(data);
}) 



//  for adding new comments in particular course
app.post('/post/:id/comment/:c_id', (req, res) => {
    let id = req.params.id;
    let c_id = req.params.c_id;
    console.log(c_id)
    let courseid_data = allData[id-1].submission;
    let comment = courseid_data[c_id-1].usersummision;
    let len = comment.length
    // console.log(len)
    let allComment = ''
    for (var i=0 ; i<len; i++){
        let allreadyComment = comment[i]["username"]
        allComment+=allreadyComment
        console.log(allreadyComment)    
    }if (allreadyComment == 'anand19@navgurukul.org'){
        console.log('mohit')
    }

    // let allreadyComment = comment[0]["username"]
    
    let username = req.body.username;
    let usersubmissions = req.body.usersubmissions;
    let courseid_len = courseid_data.length;
    let courseid = c_id
    // console.log(allreadyComment)
    // const data = {
    //     id:id,
    //     courseid,
    //     username,
    //     usersubmissions
    // }
    // console.log(comment["username"])
    // // console.log(data)
    // if (comment.includes(username)){
    //     console.log(username)
    // // usersubmissions.push(data)
    // }
    // else
    // {comment.push(data)
    // res.send(data);}
}) 



app.listen(port, function () {
    console.log(" your port is listning at port ", { port })
})