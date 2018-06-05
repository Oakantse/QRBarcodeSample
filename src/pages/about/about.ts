import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };

  public signatureImage: string;
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;

  constructor(public navCtrl: NavController) { }

  ngAfterViewInit() {
   
  }

  drawCancel() {

  }

  drawComplete() {
    this.signatureImage = this.signaturePad.toDataURL();
    console.log(this.signatureImage);
  }

  drawClear() {
    this.signaturePad.clear();
  }
  
}
