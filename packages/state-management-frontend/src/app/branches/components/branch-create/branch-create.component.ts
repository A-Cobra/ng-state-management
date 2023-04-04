import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-branch-create',
  templateUrl: './branch-create.component.html',
  styleUrls: ['./branch-create.component.scss'],
})
export class BranchCreateComponent implements OnInit {
  typeForm = 'Create';

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    if (this.route?.snapshot.url[0].path !== 'create') {
      this.typeForm = 'Edit';
    }
  }
}
