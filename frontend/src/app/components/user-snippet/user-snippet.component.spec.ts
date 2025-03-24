import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSnippetComponent } from './user-snippet.component';

describe('UserSnippetComponent', () => {
  let component: UserSnippetComponent;
  let fixture: ComponentFixture<UserSnippetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSnippetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
