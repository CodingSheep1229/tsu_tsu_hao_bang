const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema(
    {
        _id: String,
        ischeck: Boolean,
        work: String,
        principle: String,
        deadtime: String,
    }
);

mongoose.model("Todo", TodoSchema);