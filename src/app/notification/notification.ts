import {ChangeDetectorRef, Component} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [
    NgClass
  ],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification {
  messages: { text: string, type: 'success' | 'error' | 'info' }[] = [];
constructor(private cd: ChangeDetectorRef) {
}
  show(text: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) {
    const msg = {text, type};
    this.messages.push(msg);
    this.cd.detectChanges();
    setTimeout(() => this.remove(msg), duration);
  }

  remove(msg: any) {
    this.messages = this.messages.filter(m => m !== msg);
  }
}
