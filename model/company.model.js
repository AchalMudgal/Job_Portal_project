const mongoose = require("mongoose");
const {companyVerificationStatuses} = require("../utils/constants");

const companySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        verified: {
            type: String,
            default: companyVerificationStatuses.approved,
            enum: [
                companyVerificationStatuses.approved,
                companyVerificationStatuses.pending,
                companyVerificationStatuses.rejected
            ]
        },
        jobPosted: {
            type: [mongoose.SchemaType.objectId],
            ref: "Job"
        },
        hrs:{
            type: [mongoose.SchemaType.objectId],
            ref: "User"
        }
    },
    {timestamps: true, versionKey: false}
);

module.exports = mongoose.model("Company", companySchema);