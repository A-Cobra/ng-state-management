import { TestBed } from '@angular/core/testing';
import { CreateFormComponent } from './create-form.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CreateFormComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CreateFormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
