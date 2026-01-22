import { Component, input} from '@angular/core';

@Component({
  selector: 'button-bp',
  styleUrl: './button.component.scss',
  templateUrl: 'button.component.html',
})

export class ButtonBpComponent {
  label = input<string>('')
  type = input<'button' | 'submit'>('button')
  nameClass = input<string>('')
}
