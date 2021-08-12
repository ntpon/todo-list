export default class Project {
  constructor(name, description) {
    this.id = parseInt(Math.random() * 100000);

    this.name = name;
    this.description = description;
    this.tasks = [];
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }

  getTasks() {
    return this.tasks;
  }

  getTask(taskName) {
    return this.tasks.find((task) => task.getName() === taskName);
  }

  addTask(newTask) {
    //Check Duplicate
    if (this.tasks.find((task) => task.getName() === newTask.getName()))
      return false;
    this.tasks.push(newTask);
    return true;
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter(
      (task) => task.id.toString() !== taskId.toString()
    );
    return this.tasks;
  }
}
