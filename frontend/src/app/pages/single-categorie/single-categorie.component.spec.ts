import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCategorieComponent } from './single-categorie.component';

describe('SingleCategorieComponent', () => {
  let component: SingleCategorieComponent;
  let fixture: ComponentFixture<SingleCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCategorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
