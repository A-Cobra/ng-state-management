import { Component } from '@angular/core';
import { ClassificationService } from '../../services/classification.service';
import { Classification } from '../../models/api-response.model';

@Component({
  selector: 'state-management-app-classification-create',
  templateUrl: './classification-create.component.html',
  styleUrls: ['./classification-create.component.scss'],
})
export class ClassificationCreateComponent {
  classification: Classification;
  constructor(private readonly classificationService: ClassificationService) {}
  addCategory(data: Classification) {
    this.classificationService.addClassification(data).subscribe({
      next: (result: Classification) => {
        this.classification = result;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
