import {AfterViewInit, Component, OnInit, signal, ViewChild} from '@angular/core';
import {NewVersion} from './new-version/new-version';
import {Welcome} from './welcome/welcome';
import {Notification} from './notification/notification';

@Component({
  selector: 'app-root',
  imports: [
    NewVersion,
    Welcome,
    Notification
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit,AfterViewInit {
  protected readonly title = signal('pwa-app');
  @ViewChild('notifier') notifier!: Notification;

  constructor() {
  }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.showNotification();
  }

  showNotification() {
    if (navigator.onLine) {
      this.notifier.show('شما آنلاین هستید!', 'success');
    }
    window.addEventListener('online', () => {
      this.notifier.show('شما آنلاین هستید!', 'success');
    });
    window.addEventListener('offline', () => {
      this.notifier.show('شما آفلاین هستید!', 'error');
    });
  }

}
