const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema(
    {
        time: String,
        itinerary: String,
        spending: Number,
        remark: String,
    }
);

module.exports = mongoose.model("schedule", ScheduleSchema);