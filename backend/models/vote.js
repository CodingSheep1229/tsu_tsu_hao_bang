const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoteSchema = new Schema(
    {
        _id: String,
        title: String,
        data: [
            {
                _id: String,
                subject: String,
                description: String,
                member: [String],
            }
        ]
    }
);

mongoose.model("Vote", VoteSchema);