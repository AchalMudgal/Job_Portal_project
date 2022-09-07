const mongoose = require("mongoose");
const {userTypes,userStatuses} = require("../utils/constants");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            minLength: 5
        },
        userId:{
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
            trim: true,
            minLength: 8
        },
        userType:{
            type: String,
            default: userTypes.applicant,
            enum: [
                userTypes.applicant,
                userTypes.hr,
                userTypes.admin
            ]
        },
        userStatuses:{
            type: String,
            default: userStatuses.approved,
            enum: [
                userStatuses.approved,
                userStatuses.pending,
                userStatuses.rejected
            ]
        }
    }
)

module.exports = mongoose.model("User", userSchema);