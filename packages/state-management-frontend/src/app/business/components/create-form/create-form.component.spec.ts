import { TestBed } from '@angular/core/testing';
import { CreateFormComponent } from './create-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from '@clapp1/clapp-angular';

describe('CreateFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ModalModule],
      declarations: [CreateFormComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CreateFormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
