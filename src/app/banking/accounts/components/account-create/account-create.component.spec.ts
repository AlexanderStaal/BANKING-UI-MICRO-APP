import { AccountCreateComponent } from './account-create.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('AccountCreateComponent', () => {
  let component: AccountCreateComponent;
  let fixture: ComponentFixture<AccountCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
