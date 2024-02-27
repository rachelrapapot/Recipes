import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Car from '../car.model';

@Component({
  selector: 'app-add-new-car',
  templateUrl: './add-new-car.component.html',
  styleUrls: ['./add-new-car.component.scss']
})
export class AddNewCarComponent implements OnInit {
  public car: Car;

  @Input()
  selectedCar?: Car

  @Output()
  onSaveCar: EventEmitter<Car> = new EventEmitter<Car>()
  constructor() { }

  ngOnInit(): void {
    console.log(this.selectedCar);
    this.car = this.selectedCar || { id: 'no Id', model: 'no model', name: 'no name' }
  }

  save() {
    this.onSaveCar.emit(this.car)
  }

}
