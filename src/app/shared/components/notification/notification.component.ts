import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'notification-bp',
  styleUrl: './notification.component.scss',
  templateUrl: 'notification.component.html',
})

export class NotificationComponent  {
  notify = inject(NotificationService)

  close() {
    this.notify.clearMessage()
  }
}
