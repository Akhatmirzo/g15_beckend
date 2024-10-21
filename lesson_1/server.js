const http = require("http");
const { uid } = require("uid");

const tasks = [];

class createTask {
  constructor(task) {
    this.id = uid();
    this.task = task;
    this.completed = false;
  }
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>To-Do List</h1>");
    res.write(
      "<form action='/addtask' method='POST'><input type='text' placeholder='Enter task' name='task' /><button>Submit</button></form>"
    );
    res.write("<h1>Lists</h1>");

    if (tasks.length > 0) {
      res.write("<ul>");
      tasks?.forEach((task) => {
        res.write(
          `<li><input type='checkbox' ${task.completed ? "checked" : ""} /> ${
            task.task
          } <button type='button'>x</button></li>`
        );
      });
      res.write("</ul>");
    } else {
      res.write("<h2>No tasks found</h2>");
    }
  }

  if (req.url === "/addtask" && req.method === "POST") {
    let body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const data = Buffer.concat(body).toString();
      const task = data.split("=")[1];

      const newTask = new createTask(task);
      tasks.push(newTask);
      console.log(newTask);
    });
    res.writeHead(302, { Location: "/" });
  }

  res.end();
});

server.listen(8000, (err) => {
  if (!err) {
    console.log("Server is running on port 8000");
  }
});
