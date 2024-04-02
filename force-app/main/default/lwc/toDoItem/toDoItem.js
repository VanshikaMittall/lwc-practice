import { LightningElement, api} from 'lwc';

export default class ToDoItem extends LightningElement {
    //public properties
  @api todoName;
  @api todoId;
  @api done = false;

  get containerClass() {
    return this.done ? "todo completed" : "todo upcoming";
  }
}