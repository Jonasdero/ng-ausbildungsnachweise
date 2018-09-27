import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared';

@Component({
  selector: 'app-notifications',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  notifications: NotificationContent[] = []
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notificationChange.subscribe(() => {
      this.notifications = this.notificationService.notifications;
    })
    this.notifications = this.notificationService.notifications;
  }

  onFinished(notification: NotificationContent) {
    this.notificationService.removeNotification(notification);
  }
}