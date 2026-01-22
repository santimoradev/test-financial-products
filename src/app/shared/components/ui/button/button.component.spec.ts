import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonBpComponent } from './button.component';

describe('ButtonBpComponent', () => {
  let component: ButtonBpComponent;
  let fixture: ComponentFixture<ButtonBpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonBpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonBpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the button type correctly', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.type).toBe('submit');
  });

  it('should apply the CSS class received via input', () => {
    fixture.componentRef.setInput('nameClass', 'btn-primary');
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('btn-primary')).toBe(true);
  });
});
