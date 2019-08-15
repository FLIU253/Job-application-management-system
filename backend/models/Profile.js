const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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

module.exports = Profile = mongoose.model('profile', ProfileSchema);

