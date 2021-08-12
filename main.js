(() => {
  'use strict';
  class t {
    constructor(t, e) {
      (this.id = parseInt(1e5 * Math.random())),
        (this.name = t),
        (this.description = e),
        (this.tasks = []);
    }
    setName(t) {
      this.name = t;
    }
    getName() {
      return this.name;
    }
    setDescription(t) {
      this.description = t;
    }
    getDescription() {
      return this.description;
    }
    setTasks(t) {
      this.tasks = t;
    }
    getTasks() {
      return this.tasks;
    }
    getTask(t) {
      return this.tasks.find((e) => e.getName() === t);
    }
    addTask(t) {
      return (
        !this.tasks.find((e) => e.getName() === t.getName()) &&
        (this.tasks.push(t), !0)
      );
    }
    deleteTask(t) {
      return (
        (this.tasks = this.tasks.filter(
          (e) => e.id.toString() !== t.toString()
        )),
        this.tasks
      );
    }
  }
  class e {
    constructor(t, e = '', s = !1) {
      (this.id = parseInt(1e5 * Math.random())),
        (this.name = t),
        (this.dueDate = e),
        (this.status = s);
    }
    setName(t) {
      this.name = t;
    }
    getName() {
      return this.name;
    }
    setStatus(t) {
      this.status = t;
    }
    getStatus() {
      return this.status;
    }
    setDate(t) {
      this.dueDate = t;
    }
    getDate() {
      return this.dueDate;
    }
    toggle() {
      this.status = !this.status;
    }
    getDateFomat() {
      return `${this.dueDate}`;
    }
  }
  class s {
    static getTodoList() {
      const s = JSON.parse(localStorage.getItem('todoList'));
      if (!s) return [];
      let n = s.map((e) => Object.assign(new t(), e));
      return (
        console.log(n),
        n.forEach((t) => {
          t.setTasks(
            t.getTasks().map((t) => (console.log(t), Object.assign(new e(), t)))
          );
        }),
        n
      );
    }
    static saveTodoList(t) {
      localStorage.setItem('todoList', JSON.stringify(t));
    }
  }
  new (class {
    constructor() {
      (this.btnAddProject = document.getElementById('add-project')),
        (this.btnAddTask = document.getElementById('add-task')),
        (this.navContainer = document.getElementById('nav-container')),
        (this.mainContainer = document.getElementById('main-container')),
        (this.mainTitle = document.getElementById('main-title')),
        (this.mainDes = document.getElementById('main-des')),
        (this.projectForm = document.getElementById('form-create-project')),
        (this.createProjectContainer =
          document.getElementById('create-project')),
        (this.createTaskContainer = document.getElementById('create-task')),
        (this.taskForm = document.getElementById('form-task')),
        (this.taskListContainer = document.getElementById(
          'task-list-container'
        )),
        (this.currentProject = '');
      const t = s.getTodoList();
      (this.projects = t || []),
        this.btnAddProject.addEventListener(
          'click',
          this.openProjectForm.bind(this)
        ),
        this.btnAddTask.addEventListener(
          'click',
          this.openTaskProjectForm.bind(this)
        ),
        this.taskListContainer.addEventListener(
          'click',
          this.taskListClickHanler.bind(this)
        ),
        this.navContainer.addEventListener('click', this.navHandler.bind(this)),
        this.initApp();
    }
    initApp() {
      this.projects.length > 0
        ? (this.render(), this.openProject(this.projects[0].name))
        : this.openProjectForm();
    }
    navHandler(t) {
      const e = t.target.closest('.btn-delete-project');
      e &&
        ((this.projects = this.projects.filter(
          (t) => t.id.toString() !== e.dataset.id.toString()
        )),
        s.saveTodoList(this.projects),
        this.render(),
        this.initApp());
    }
    taskListClickHanler(t) {
      const e = t.target.closest('.label-task'),
        n = t.target.closest('.btn-task-delete');
      if (e) {
        e.classList.toggle('task-success');
        const t = this.projects.find(
          (t) => t.getName() === this.currentProject
        );
        t.tasks
          .find((t) => t.id.toString() === e.dataset.id.toString())
          .toggle(),
          this.renderTask(t),
          s.saveTodoList(this.projects);
      }
      if (n) {
        const t = this.projects.find(
          (t) => t.getName() === this.currentProject
        );
        t.deleteTask(n.dataset.id),
          s.saveTodoList(this.projects),
          this.renderTask(t);
      }
    }
    openProject(t) {
      (this.currentProject = t),
        (this.mainContainer.style.display = ''),
        (this.createProjectContainer.style.display = 'none'),
        (this.createTaskContainer.style.display = 'none');
      const e = this.projects.find((e) => e.getName() === t);
      (this.mainTitle.textContent = e.getName()),
        (this.mainDes.textContent = e.getDescription()),
        this.renderTask(e);
    }
    openTaskProjectForm() {
      (this.mainContainer.style.display = 'none'),
        (this.createTaskContainer.style.display = ''),
        (document.getElementById('title-main-project').textContent =
          this.currentProject),
        (this.taskForm.onsubmit = this.taskFormHanlder.bind(this));
    }
    taskFormHanlder(t) {
      t.preventDefault();
      const n = document.getElementById('input-task-name').value,
        i = document.getElementById('input-date').value;
      i && n
        ? this.projects
            .find((t) => t.getName() === this.currentProject)
            .addTask(new e(n, i))
          ? (s.saveTodoList(this.projects),
            this.taskForm.reset(),
            this.openProject(this.currentProject))
          : alert('Insert Fail: Task is dublicated')
        : alert('Please Enter Input');
    }
    openProjectForm() {
      (this.mainContainer.style.display = 'none'),
        (this.createTaskContainer.style.display = 'none'),
        (this.createProjectContainer.style.display = ''),
        (this.projectForm.onsubmit = this.projectFormHanlder.bind(this));
    }
    projectFormHanlder(e) {
      e.preventDefault();
      const n = document.getElementById('input-name').value,
        i = document.getElementById('input-des').value;
      i && n
        ? (this.projectForm.reset(),
          this.projects.push(new t(n, i)),
          s.saveTodoList(this.projects),
          this.render(),
          this.openProject(n))
        : alert('Please Enter Input');
    }
    render() {
      (this.navContainer.innerHTML = ''),
        this.projects.forEach((t) => {
          const e = document.createElement('li');
          e.className = 'nav-item';
          const s = document.createElement('div');
          (s.className = 'nav-item-link'),
            (s.innerHTML = `\n      <i class="fas fa-tasks" aria-hidden="true"></i>\n      ${t.getName()}\n      `),
            s.addEventListener(
              'click',
              this.openProject.bind(this, t.getName())
            );
          const n = document.createElement('button');
          (n.className = 'btn-delete-project'), (n.dataset.id = t.id);
          const i = document.createElement('i');
          (i.className = 'fas fa-times'),
            n.append(i),
            e.append(s),
            e.append(n),
            this.navContainer.append(e);
        });
    }
    renderTask(t) {
      this.taskListContainer.innerHTML = '';
      let e = '';
      t.tasks.forEach((t) => {
        const s = t.getStatus() ? 'task-success' : '',
          n = t.getStatus() ? 'checked' : '';
        e += `<div class="task">\n          <div class="task-des">\n            <label class="label-task ${s}" for="${
          t.id
        }" data-id="${t.id}">            <input type="checkbox" ${n} id="${
          t.id
        }" />\n\n            <span>${t.getName()}</span>,\n            <span class="date">${t.getDateFomat()}</span> <br />\n          </label>\n        </div>\n        <div class="task-btn-container">\n        <button type="button" class="btn-icon btn-task-delete" data-id="${
          t.id
        }">\n          <i class="fas fa-eraser fa-lg"></i>\n        </button>\n        </div>\n      </div>`;
      }),
        (this.taskListContainer.innerHTML = e);
    }
  })();
})();
