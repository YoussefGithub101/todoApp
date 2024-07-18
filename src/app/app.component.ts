import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
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
    if (confirm('Are you sure you want to clear all to-do items?')) {
      this.todos = [];
      this.saveTodos();
    }
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

}
