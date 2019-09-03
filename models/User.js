const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    toApply: [
        {
            companyName: {
                type: String,
                required: true
            },
            jobTitle : {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            applicationUrl: {
                type: String
            },
            deadlineDate :{
                type: Date
            }
        }
    ],
    appliedTo: [
        {
            companyName: {
                type: String,
                required: true
            },
            jobTitle : {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            applicationUrl: {
                type: String
            },
            appliedDate: {
                type: Date
            }
        }
    ],
    interview: [
        {
            companyName: {
                type: String,
                required: true
            },
            jobTitle : {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            applicationUrl: {
                type: String
            },
            interviewDate: {
                type: Date
            }
        }
    ],
    offered: [
        {
            companyName: {
                type: String,
                required: true
            },
            jobTitle : {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            applicationUrl: {
                type: String
            },
            offerDeadlineDate: {
                type: Date
            }
        }
    ],
    rejected: [
        {
            companyName: {
                type: String,
                required: true
            },
            jobTitle : {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            applicationUrl: {
                type: String
            }
        }
    ]
});

module.exports = User = mongoose.model('user', UserSchema);