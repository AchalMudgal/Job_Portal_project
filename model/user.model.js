const mongoose = require("mongoose");
const {userTypes,userStatuses} = require("../utils/constants");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            minLength: 5
        },
        userId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minLength: 8
        },
        userType: {
            type: String,
            default: userTypes.applicant,
            enum:[
                userTypes.applicant,
                userTypes.admin,
                userTypes.hr
            ]
        },
        userStatus: {
            type: String,
            default: userStatuses.approved,
            enum: [
                userStatuses.approved,
                userStatuses.pending,
                userStatuses.rejected
            ]
        },
        jobsApplied: {
            type: [mongoose.SchemaType.objectId],
            ref: "Job"
        },
        companyId:{
            type: mongoose.SchemaType.objectId,
            ref: "Company"
        }
    }
)

module.exports = mongoose.model("User", userSchema);