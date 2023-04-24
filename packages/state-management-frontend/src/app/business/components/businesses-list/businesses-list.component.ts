import { Component } from '@angular/core';

@Component({
  selector: 'app-businesses-list',
  templateUrl: './businesses-list.component.html',
  styleUrls: ['./businesses-list.component.scss'],
})
export class BusinessesListComponent {
  mockRecords = [
    {
      id: 1,
      name: 'test',
      description: 'test',
    },
    {
      id: 2,
      name: 'test',
      description: 'test',
    },
    {
      id: 3,
      name: 'test',
      description: 'test',
    },
    {
      id: 4,
      name: 'test',
      description: 'test',
    },
    {
      id: 6,
      name: 'test',
      description: 'test',
    },
  ];
  recordsPerPage = 8;
  totalRecords = 20;
}
