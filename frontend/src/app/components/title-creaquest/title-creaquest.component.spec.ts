import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCreaquestComponent } from './title-creaquest.component';

describe('TitleCreaquestComponent', () => {
  let component: TitleCreaquestComponent;
  let fixture: ComponentFixture<TitleCreaquestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleCreaquestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleCreaquestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
