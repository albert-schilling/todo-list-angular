import { Component, OnInit } from '@angular/core'
import { ToDo } from '../_interface/todo'
import { EventPing } from '../_interface/EventPing'

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass'],
})
export class PageListComponent implements OnInit {
  public toDoShow: boolean
  public toDoDoneShow: boolean
  public $todos: ToDo[]
  public $todosdone: ToDo[]

  constructor() {
    this.toDoShow = true
    this.toDoDoneShow = false
    this.$todos = [
      { id: 0, label: 'test', status: false, position: 1 },
      { id: 1, label: 'test 2', status: false, position: 2 },
    ]
    this.$todosdone = []
  }

  ngOnInit(): void {}

  public create(event: ToDo): void {
    event.position = this.$todos.length + 1
    this.$todos.push(event)
  }

  public update(event: EventPing): void {
    if ('check' === event.label) {
      if (!event.object.status) {
        this.$todosdone.splice(this.$todosdone.indexOf(event.object), 1)
        this.$todos.push(event.object)
      } else {
        this.$todos.splice(this.$todos.indexOf(event.object), 1)
        this.$todosdone.push(event.object)
      }
    }
    if ('delete' === event.label) {
      if (event.object.status) {
        this.$todosdone.splice(this.$todosdone.indexOf(event.object), 1)
      } else {
        this.$todos.splice(this.$todos.indexOf(event.object), 1)
      }
    }
    if ('label' === event.label) {
      if (event.object.status) {
        this.$todosdone.forEach((toDo: ToDo) => {
          if (toDo.id === event.object.id) {
            toDo.label = event.object.label
          }
        })
      } else {
        this.$todos.forEach((toDo: ToDo) => {
          if (toDo.id === event.object.id) {
            toDo.label = event.object.label
          }
        })
      }
    }
  }
}
