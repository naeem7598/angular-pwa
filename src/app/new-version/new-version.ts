import {Component, OnInit, ViewChild} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-new-version',
  imports: [
  ],
  templateUrl: './new-version.html',
  styleUrl: './new-version.css'
})
export class NewVersion implements OnInit {


  deferredPrompt: any;
  isInstalled: boolean = false;


  constructor(private swUpdate: SwUpdate) {
  }

  ngOnInit() {
    this.checkInstalled();

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_DETECTED' && this.isInstalled)
          if (confirm('نسخه جدید موجود است. بارگذاری مجدد می‌کنید؟')) {
            window.location.reload();
          }
      });
    }
  }

  checkInstalled() {
    this.isInstalled = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as any).standalone === true;

    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault(); // جلوگیری از prompt خودکار
      this.deferredPrompt = e;
    });

    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.deferredPrompt = null;
    });
  }

  installPWA() {
    if (!this.deferredPrompt) return;
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('کاربر نصب را قبول کرد');
      } else {
        console.log('کاربر نصب را رد کرد');
      }
      this.deferredPrompt = null;
    });
  }


}
