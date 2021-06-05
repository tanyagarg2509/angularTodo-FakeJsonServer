import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../servies/task.service';
import {Task} from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskss: Task[] = [];
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
     this.taskService.getTasks().
     subscribe((tasks)=>(this.taskss = tasks));
  }

  deleteTask(task: Task){
    this.taskService
    .deleteTask(task)
    .subscribe(
      ()=>(this.taskss = this.taskss.filter(
        t=> t.id !== task.id
        )
        )
      );
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task){
    // console.log(task);
    this.taskService.addTask(task).
     subscribe((task)=>(this.taskss.push(task)));
  }
}


