import { LightningElement ,track} from 'lwc';

export default class ToDoApp extends LightningElement {
    @track time="10:48";
    @track greeting="Good Evening";
    
    @track todos=[];

    connectedCallback(){
        this.getTime();

        setInterval(() => {
            this.getTime();
        }, 1000*60);
    }
    getTime(){
        const date= new Date();
        const hour= date.getHours();
        const min=date.getMinutes();

        this.time=`${this.gethour(hour)}:${this.getDoubleDigit(min)} ${this.getMidDayHour(hour)}`;
        this.setGreeting(hour);
    }
    gethour(hour){
        return hour===0 ? 12 : hour > 12 ? (hour - 12) :hour;
    }
    getMidDayHour(hour){
        return hour>=12 ? "AM" : "PM";
    }
    getDoubleDigit(digit){
        return digit<10 ? "0"+digit: digit;
    }
    setGreeting(hour){
        if (hour < 12) {
            this.greeting = "Good Morning";
          } else if (hour >= 12 && hour < 17) {
            this.greeting = "Good Afternoon";
          } else {
            this.greeting = "Good Evening";
          }
    }

    addToDoHandler(){
        const inputBox= this.template.querySelector("lightning-input");
        const todo={
            todoId: this.todos.length,
            todoName: inputBox.value,
            done: false,
            todoDate: new Date()
        }
        this.todos.push(todo);
        inputBox.value="";
    }

    get upcomingTasks(){
        return this.todos && this.todos.length 
        ? this.todos.filter(todo => !todo.done)
        :[];
    }

    get completedTasks(){
        return this.todos && this.todos.length 
        ? this.todos.filter(todo => todo.done)
        :[];
    }
}