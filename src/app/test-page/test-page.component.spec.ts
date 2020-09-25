import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPageComponent } from 'src/app/test-page/test-page.component';
import { provideMockStore } from '@ngrx/store/testing';


describe('TestPageComponent', () => {
  let component: TestPageComponent;
  let fixture: ComponentFixture<TestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestPageComponent],
      providers: [
        provideMockStore(),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
