import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public platform: Platform, public qrScanner: QRScanner, public navCtrl: NavController, private toast: Toast) {

  }

  ngOnInit() {

    this.openQRScanner();
  }
  openQRScanner(): void {

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          this.qrScanner.show();
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.toast.show(text, '5000', 'bottom').subscribe(
              toast => {
                console.log(toast);
              }
            );
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          this.toast.show('camera permission was permanently denied', '5000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
          console.log('camera permission was permanently denied');

        } else {
          this.toast.show('permission was denied', '5000', 'bottom').subscribe(
            toast => {
              console.log(toast);
            }
          );
          console.log('permission was denied');
        }
      })
      .catch((e: any) => console.log('Error is', e));

  }


}
