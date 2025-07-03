import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertareditarofertadetrabajoComponent } from './insertareditarofertadetrabajo.component';

describe('InsertareditarofertadetrabajoComponent', () => {
  let component: InsertareditarofertadetrabajoComponent;
  let fixture: ComponentFixture<InsertareditarofertadetrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertareditarofertadetrabajoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertareditarofertadetrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
