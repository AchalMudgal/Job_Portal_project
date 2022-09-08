const express = require("express");
const app = express();

const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const User = require("./model/job.model");
const Job = require("./model/job.model");
const Company = require("./model/company.model");
const constants = require("./utils/constants");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect(dbConfig.DB_URI);
const db = mongoose.connection;
db.on("error", ()=>{
    console.log("Error while connecting to the db");
});
db.once("open", ()=>{
    console.log("Connected to the mongodb");
    init();
});

async function init(){
    try{
        await User.collection.drop();
        await Job.collection.drop();
        await Company.collection.drop();

        const adminUser = await User.create({
            name:"admin",
            userId:"admin",
            password: bcrypt.hashSync("Mypassword",8),
            email: "admin@gmail.com",
            userType: constants.companyVerificationStatuses.approved
        });
        
        const company = await Company.create({
            name: "ABC company",
            address: "ABC address",
            verified: constants.companyVerificationStatuses.approved
        });

        const applicantUser = await User.create({
            name: "applicant1",
            userId: "applicant1",
            password: bcrypt.hashSync("Mypassword1",8),
            email: "applicant1@gmail.com",
            userType: constants.userTypes.applicant
        });

        const hrUser = await User.create({
            name: "hr1",
            userId: "hr1",
            password: bcrypt.hashSync("Mypassword"),
            email: "hr1@gmail.com",
            userType: constants.userTypes.hr,
            userStatus: constants.userStatuses.approved, //for testing porpose
        });

        console.log(adminUser);
        console.log(company);
        console.log(applicantUser);
        console.log(hrUser);

        company.hrs.push(hrUser._id);
        await company.save(); //save in db

        console.log("After saving company", company);

        const job = await Job.create({
            title: "Job1",
            description: "Job1 description",
            company: company._id,
            postedBy: hrUser._id
        });

        console.log(job);

        //now update the company jobPosted

        company.jobPosted.push(job._id);
        await company.save();
        console.log("Company After", company);

        //application applying a job
        job.applicants.push(applicantUser._id);
        await job.save();
        
        //also update the applicant
        applicantUser.jobsApplied.push(job._id);
        await applicantUser.save();
        console.log("After", job);
        console.log("After", applicantUser);

    }
    catch(err){
        console.log("Err in db intialization" + err);
    }
}


app.listen(serverConfig.PORT, ()=>{
    console.log("Server running at port :",serverConfig.PORT);
});