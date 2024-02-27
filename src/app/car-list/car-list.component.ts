import { Component, OnInit } from '@angular/core';
import Car from '../car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  public cars: Car[] = [{ model: 'hfj456', name: 'car1' }, { id: '123456', model: 'hfj456', name: 'car1' }]
  public isAddNewCar: boolean = false
  public selectedCar: Car

  constructor() { }

  ngOnInit(): void {
  }

  delete(car: Car) {
    let index = this.cars.indexOf(car)
    this.cars.splice(index, 1)
  }


  addNewCar() {
    this.isAddNewCar = true
  }

  save(car: Car) {
    this.cars.push(car)
    this.isAddNewCar = false
  }

  updateCar(car: Car) {
    this.isAddNewCar = true
    this.selectedCar = car
  }
}
