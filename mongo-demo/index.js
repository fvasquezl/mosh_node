const { default: mongoose } = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to Mongodb"))
  .catch((err) => console.error("Error connection", err));

//Schema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 255 },
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          //Do some async work
          const result = v && v.length > 0;
          callback(result);
        }, 1000);
      },
      message: "A course shoud have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

//
//Model
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    category: "web",
    author: "Fvasquez",
    tags: [],
    isPublished: true,
    price: 15,
  });
  try {
    await course.validate();
    // const result = await course.save();
    // console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
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
// Update getting object
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "Another author";
  const result = await course.save();
  console.log(result);
}
//update directly in database
async function updateCourseDatabase(id) {
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: { author: "Fvasquez", isPublished: false },
    }
  );
  console.log(result);
}

//update directly in database
async function updateCourseDatabaseFindingId(id) {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: { author: "fvasquezl", isPublished: false },
    },
    { new: true }
  );
  console.log(result);
}

//remove document from database
async function removeCourse(id) {
  const result = await Course.findByIdAndRemove(id);
  console.log(result);
}

createCourse();
