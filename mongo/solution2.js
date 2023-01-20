const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/mongo-exercises")
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("Error connection", err));

//Schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

//Model
const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({
    isPublished: true,
    // tags: { $in: ["backend", "frontend"] },
  })
    .or([{ tags: "backend" }, { tags: "frontend" }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}
async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
