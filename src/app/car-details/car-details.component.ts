import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Car from '../car.model';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  @Input()
  car: Car

  @Output()
  onDeleteCar: EventEmitter<Car> = new EventEmitter<Car>()

  @Output()
  onUpdateCar: EventEmitter<Car> = new EventEmitter<Car>()

  constructor() { }

  ngOnInit(): void {
  }

  deleteCarDetails() {
    this.onDeleteCar.emit(this.car);
  }

  updateCar() {
    this.onUpdateCar.emit(this.car)
  }
}
