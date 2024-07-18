import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  title = 'To-Do-app';
  newTodo: string = '';
  todos: string[] = [];

 
  ngOnInit(): void {
     
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      this.todos.push(this.newTodo.trim());
      this.newTodo = '';
      this.saveTodos();
    }
  }

  removeTodo(index: number): void {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  clearAll(): void {
    Swal.fire({
      title: "Are you sure you want to clear all to-do items?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
      this.todos = [];
      this.saveTodos();
      Swal.fire({
        title: "Deleted!",
        text: "the to-do List has been deleted.",
        icon: "success"
      });
    }
  });
     
 
    
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  
  alrat(){

    Swal.fire({
      title: "Are you sure you want to clear all to-do items?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}
  
}
