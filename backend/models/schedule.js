const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScheduleSchema = new Schema(
    {
        _id: String,
        time: String,
        itinerary: String,
        spending: Number,
        remark: String,
    }
);

mongoose.model("Schedule", ScheduleSchema);