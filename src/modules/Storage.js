import Project from './Project';
import Task from './Task';

export default class Storage {
  static getTodoList() {
    const data = JSON.parse(localStorage.getItem('todoList'));
    if (!data) return [];
    let todoLists = data.map((project) => {
      return Object.assign(new Project(), project);
    });
    console.log(todoLists);

    todoLists.forEach((project) => {
      project.setTasks(
        project.getTasks().map((task) => {
          console.log(task);
          return Object.assign(new Task(), task);
        })
      );
    });
    return todoLists;
  }
  static saveTodoList(data) {
    localStorage.setItem('todoList', JSON.stringify(data));
  }
}
