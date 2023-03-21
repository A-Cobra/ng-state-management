import {Component} from '@angular/core';

@Component({
  selector: 'state-management-app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.scss'],
})
export class BusinessListComponent {
  mockRecords = [
    {
      id: 1,
      name: "test",
      description: "test",
    }, {
      id: 2,
      name: "test",
      description: "test",
    }, {
      id: 3,
      name: "test",
      description: "test",
    }, {
      id: 4,
      name: "test",
      description: "test",
    },
    {
      id: 6,
      name: "test",
      description: "test",
    },

  ]
  recordsPerPage = 8;
  totalRecords = 20;
}
