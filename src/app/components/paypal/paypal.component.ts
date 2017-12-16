import { Component, OnInit, AfterViewChecked } from '@angular/core';
declare let paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit, AfterViewChecked {
  pedido: any;
  constructor() { }

  ngOnInit() {
    var pedidoSorage = JSON.parse(localStorage.pedido);
    this.pedido = pedidoSorage;
    console.log(this.pedido);
  }



  //Payment with paypal
  public didPaypalScriptLoad: boolean = false;
  public loading: boolean = true;

  public paypalConfig: any = {
    env: 'production',
    client: {
      sandbox: 'AYgOYFoyFC-jdzeYm1bHEtWpyoVHA_xAyVMgYw79E6rg2l51dkgl45imtGQ3C-kqKd8RbmvULQrwYqzQ',
      production: 'AXQZJ_jf0kUt40nbAgZoODs_JBZu1J4TQb5sEe3gIH36GCSyKJOzKDewQ4rjVOhyPWBlpi_UzWg6H1Wn'
    },
    commit: true,
    payment: (data, actions) => {
      console.log("funcion_1");
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.pedido.preciototal, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {

    },

  };

  public ngAfterViewChecked(): void {
    if (!this.didPaypalScriptLoad) {
      this.loadPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button');
        console.log("funcion_2");
        this.loading = false;
      });
    }
  }

  public loadPaypalScript(): Promise<any> {
    this.didPaypalScriptLoad = true;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
      console.log("funcion_3")
    });
  }

}
