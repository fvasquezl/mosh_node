console.log("Before");

getUser(1, (user) => {
  console.log("User", user);
  getRepositories(user.gitHubUsername, (repos) => {
    console.log("Repos", repos);
  });
});

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database");
    callback({ id: id, gitHubUsername: "fvasquezl" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Reading repositories");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}