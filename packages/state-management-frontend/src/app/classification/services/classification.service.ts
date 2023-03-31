import { Injectable } from '@angular/core';
import { Classification } from '../models/api-response.model';
import { CLASSIFICATIONS } from '../data/classifications';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class ClassificationService {
  //TODO:The whole related to saving to localStorage should be removed when connecting to the API
  arrClassification: Classification[] = CLASSIFICATIONS;

  addClassification(data: Classification): Observable<Classification> {
    this.arrClassification.push({
      ...data,
      id: `${this.arrClassification.length}uuid`,
    });
    this.setMockClassifications();
    this.getDataFromStorage();
    return of(this.arrClassification[this.arrClassification.length - 1]);
  }

  getClassificationById(id: string): Observable<Classification> {
    this.getDataFromStorage();
    const classification = this.arrClassification.find(
      (item) => item.id === id
    );

    return !classification
      ? throwError(() => new Error('Classification not found.'))
      : of(classification);
  }

  updateClassification(data: Classification): Observable<Classification> {
    this.getDataFromStorage();
    const dataServer = this.arrClassification.find(
      (item) => item.id === data.id
    ) as Classification;
    const index = this.arrClassification.indexOf(dataServer);
    this.arrClassification[index] = data;
    this.setMockClassifications();

    return !dataServer
      ? throwError(() => new Error('Classification not found.'))
      : of(data);
  }

  deleteClassification(id: string): Observable<string> {
    this.getDataFromStorage();
    this.arrClassification = this.arrClassification.filter(
      (item) => item.id !== id
    );
    this.setMockClassifications();

    return of('classification was deleted');
  }

  setMockClassifications(): void {
    localStorage.setItem(
      'mockClassifications',
      JSON.stringify(this.arrClassification)
    );
  }

  getDataFromStorage(): void {
    const data = localStorage.getItem('mockClassifications');
    this.arrClassification = data ? JSON.parse(data) : this.arrClassification;
  }
}
