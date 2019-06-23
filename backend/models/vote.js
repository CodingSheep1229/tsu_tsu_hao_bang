const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoteSchema = new Schema(
    {
        _id: String,
        title: String,
        data: [
            
        ]
    }
);

mongoose.model("Todo", TodoSchema);