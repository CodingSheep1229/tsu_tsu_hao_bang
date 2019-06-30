const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema(
    {
        _id: String,
        name: String,
        pic: String,
    }
);

mongoose.model("Project", ProjectSchema);