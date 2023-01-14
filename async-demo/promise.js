const p = new Promise((resolve, reject) => {
  //Kick off some async work
  setTimeout(() => {
    resolve(1); //Pending => resolved, fulfilled
    reject(new Error("message")); // pending => rejected
  }, 2000);
});

p.then((result) => console.log("result", result)).catch((err) =>
  console.log("Error", err.message)
);
