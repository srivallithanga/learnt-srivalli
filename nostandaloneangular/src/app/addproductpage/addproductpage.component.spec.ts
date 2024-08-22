import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductpageComponent } from './addproductpage.component';

describe('AddproductpageComponent', () => {
  let component: AddproductpageComponent;
  let fixture: ComponentFixture<AddproductpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddproductpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddproductpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
