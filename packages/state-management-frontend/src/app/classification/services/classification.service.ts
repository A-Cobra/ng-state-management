import { Injectable } from '@angular/core';
import { Classification } from '../models/api-response.model';
import { CLASSIFICATIONS } from '../data/classifications';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassificationService {
  arrClassification: Classification[] = CLASSIFICATIONS;

  addClassification(data: Classification): Observable<Classification> {
    console.log('recibiendo data', data);
    this.arrClassification.push({
      ...data,
      id: `${this.arrClassification.length}uuid`,
    });
    localStorage.setItem(
      'mockClassifications',
      JSON.stringify(this.arrClassification)
    );
    this.getDataFromStorage();
    return of(this.arrClassification[this.arrClassification.length - 1]);
  }
  getClassificationById(id: string): Observable<Classification> {
    this.getDataFromStorage();
    return of(
      this.arrClassification.find((item) => item.id === id) as Classification
    );
  }

  updateClassification(data: Classification) {
    this.getDataFromStorage();
    const dataServer = this.arrClassification.find(
      (item) => item.id === data.id
    ) as Classification;
    const index = this.arrClassification.indexOf(dataServer);
    this.arrClassification[index] = data;
    localStorage.setItem(
      'mockClassifications',
      JSON.stringify(this.arrClassification)
    );
    return of(data);
  }

  deleteClassification(id: string) {
    this.getDataFromStorage();
    this.arrClassification = this.arrClassification.filter(
      (item) => item.id !== id
    );
    localStorage.setItem(
      'mockClassifications',
      JSON.stringify(this.arrClassification)
    );
    return of('classification was deleted');
  }

  getDataFromStorage() {
    const data = localStorage.getItem('mockClassifications');
    this.arrClassification = data ? JSON.parse(data) : this.arrClassification;
  }
}
