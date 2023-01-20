const { default: mongoose } = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("Error connection", err));

//Schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

//
//Model
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Fvasquez",
    tags: ["Angular", "frontend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  //eq (equal)
  //ne (not equal)
  //gt (greater than)
  //gte (greater than or equal to)
  //lt (less than)
  //lte (less than or equal to)
  //in
  //nin (mot in)
  //---
  //or
  //and

  const courses = await Course
    //   .find({ author: "Fvasquez" })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    .find()
    .or([{ author: "Fvasquez" }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function getCoursesLogical() {
  //or
  //and
  const courses = await Course
    //   .find({ author: "Fvasquez", isPublished:true })
    .find()
    .or([{ author: "Fvasquez" }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function getCoursesRegularExpressions() {
  const courses = await Course
    //   .find({ author: "Fvasquez", isPublished: true })
    // Starts with Fvas, fvas, Case insensitivy
    // .find({ author: /^Fvas/i })
    //Ends with Vasquez
    // .find({ author: /quez$/ })
    .find({ author: /.*fvasquez.*/i })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function getCoursesCounting() {
  const courses = await Course.find({ author: "Fvasquez" })
    .limit(10)
    .sort({ name: 1 })
    .count();
  console.log(courses);
}

async function getCoursesPagination() {
  const pageNumber = 2;
  const pageSize = 10;
  // /api/courses?pageNumber=2&pageSize=10

  const courses = await Course.find({ author: "Fvasquez" })
    .limit(10)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

getCoursesPagination();
