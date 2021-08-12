import Project from './Project';
import Storage from './Storage';
import Task from './Task';

export default class App {
  constructor() {
    this.btnAddProject = document.getElementById('add-project');
    this.btnAddTask = document.getElementById('add-task');
    this.navContainer = document.getElementById('nav-container');
    this.mainContainer = document.getElementById('main-container');
    this.mainTitle = document.getElementById('main-title');
    this.mainDes = document.getElementById('main-des');
    this.projectForm = document.getElementById('form-create-project');
    this.createProjectContainer = document.getElementById('create-project');
    this.createTaskContainer = document.getElementById('create-task');
    this.taskForm = document.getElementById('form-task');
    this.taskListContainer = document.getElementById('task-list-container');
    this.currentProject = '';
    const data = Storage.getTodoList();
    this.projects = data ? data : [];
    this.btnAddProject.addEventListener(
      'click',
      this.openProjectForm.bind(this)
    );

    this.btnAddTask.addEventListener(
      'click',
      this.openTaskProjectForm.bind(this)
    );
    this.taskListContainer.addEventListener(
      'click',
      this.taskListClickHanler.bind(this)
    );
    this.navContainer.addEventListener('click', this.navHandler.bind(this));
    this.initApp();
  }

  initApp() {
    if (this.projects.length > 0) {
      this.render();
      this.openProject(this.projects[0].name);
    } else {
      this.openProjectForm();
    }
  }

  navHandler(event) {
    const btnDelete = event.target.closest('.btn-delete-project');
    if (btnDelete) {
      this.projects = this.projects.filter(
        (project) => project.id.toString() !== btnDelete.dataset.id.toString()
      );
      Storage.saveTodoList(this.projects);
      this.render();
      this.initApp();
    }
  }
  taskListClickHanler(event) {
    const checkItem = event.target.closest('.label-task');
    const btnTaskDelete = event.target.closest('.btn-task-delete');
    if (checkItem) {
      checkItem.classList.toggle('task-success');
      const project = this.projects.find(
        (p) => p.getName() === this.currentProject
      );

      const task = project.tasks.find(
        (t) => t.id.toString() === checkItem.dataset.id.toString()
      );
      task.toggle();
      this.renderTask(project);
      Storage.saveTodoList(this.projects);
    }

    if (btnTaskDelete) {
      const project = this.projects.find(
        (p) => p.getName() === this.currentProject
      );

      project.deleteTask(btnTaskDelete.dataset.id);
      Storage.saveTodoList(this.projects);
      this.renderTask(project);
    }
  }

  openProject(projectName) {
    this.currentProject = projectName;
    this.mainContainer.style.display = '';
    this.createProjectContainer.style.display = 'none';
    this.createTaskContainer.style.display = 'none';

    const project = this.projects.find((p) => p.getName() === projectName);
    this.mainTitle.textContent = project.getName();
    this.mainDes.textContent = project.getDescription();
    this.renderTask(project);
  }

  openTaskProjectForm() {
    this.mainContainer.style.display = 'none';
    this.createTaskContainer.style.display = '';
    const titleMainProject = document.getElementById('title-main-project');
    titleMainProject.textContent = this.currentProject;

    this.taskForm.onsubmit = this.taskFormHanlder.bind(this);
  }

  taskFormHanlder(event) {
    event.preventDefault();
    const inputName = document.getElementById('input-task-name').value;
    const inputDate = document.getElementById('input-date').value;

    if (!inputDate || !inputName) {
      alert('Please Enter Input');
      return;
    }
    const project = this.projects.find(
      (p) => p.getName() === this.currentProject
    );
    const status = project.addTask(new Task(inputName, inputDate));
    if (!status) {
      alert('Insert Fail: Task is dublicated');
      return;
    }
    Storage.saveTodoList(this.projects);
    this.taskForm.reset();
    this.openProject(this.currentProject);
  }

  openProjectForm() {
    this.mainContainer.style.display = 'none';
    this.createTaskContainer.style.display = 'none';
    this.createProjectContainer.style.display = '';
    this.projectForm.onsubmit = this.projectFormHanlder.bind(this);
  }

  projectFormHanlder(event) {
    event.preventDefault();
    const inputName = document.getElementById('input-name').value;
    const inputDes = document.getElementById('input-des').value;
    if (!inputDes || !inputName) {
      alert('Please Enter Input');
      return;
    }

    this.projectForm.reset();
    this.projects.push(new Project(inputName, inputDes));
    Storage.saveTodoList(this.projects);
    this.render();
    this.openProject(inputName);
  }

  render() {
    this.navContainer.innerHTML = '';
    this.projects.forEach((project) => {
      const navItem = document.createElement('li');
      navItem.className = 'nav-item';
      const div = document.createElement('div');
      div.className = 'nav-item-link';
      div.innerHTML = `
      <i class="fas fa-tasks" aria-hidden="true"></i>
      ${project.getName()}
      `;
      div.addEventListener(
        'click',
        this.openProject.bind(this, project.getName())
      );
      const buttonDeleteProject = document.createElement('button');
      buttonDeleteProject.className = 'btn-delete-project';
      buttonDeleteProject.dataset.id = project.id;
      const icon = document.createElement('i');
      icon.className = 'fas fa-times';
      buttonDeleteProject.append(icon);
      navItem.append(div);
      navItem.append(buttonDeleteProject);
      this.navContainer.append(navItem);
    });
  }

  renderTask(project) {
    this.taskListContainer.innerHTML = '';
    let taskTemplate = '';
    project.tasks.forEach((task) => {
      const classStatus = task.getStatus() ? 'task-success' : '';
      const checked = task.getStatus() ? 'checked' : '';
      taskTemplate += `<div class="task">
          <div>
            <label class="label-task ${classStatus}" for="${
        task.id
      }" data-id="${
        task.id
      }">            <input type="checkbox" ${checked} id="${task.id}" />

            <span>${task.getName()}</span>,
            <span class="date">${task.getDateFomat()}</span> <br />
          </label>
        </div>
        <div class="task-btn-container">
        <button type="button" class="btn-icon btn-task-delete" data-id="${
          task.id
        }">
          <i class="fas fa-eraser fa-lg"></i>
        </button>
        </div>
      </div>`;
    });
    this.taskListContainer.innerHTML = taskTemplate;
    // const lableTasks = document.querySelectorAll('.label-task');
    // lableTasks.onClick()
  }
}
