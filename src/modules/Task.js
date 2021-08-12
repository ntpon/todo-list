export default class Task {
  constructor(name, dueDate = '', status = false) {
    this.id = parseInt(Math.random() * 100000);
    this.name = name;
    this.dueDate = dueDate;
    this.status = status;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setStatus(status) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }
  setDate(dueDate) {
    this.dueDate = dueDate;
  }

  getDate() {
    return this.dueDate;
  }

  toggle() {
    this.status = !this.status;
  }
  getDateFomat() {
    // const day = this.dueDate.split('/')[0];
    // const month = this.dueDate.split('/')[1];
    // const year = this.dueDate.split('/')[2];
    return `${this.dueDate}`;
  }
}
