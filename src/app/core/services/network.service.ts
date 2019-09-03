import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';

const { Network } = Plugins;
@Component({
    selector: 'app-network-component',
    template: ''
  })
  export class NetworkService implements OnInit, OnDestroy {
    networkStatus: NetworkStatus;
    networkListener: PluginListenerHandle;
  
    async ngOnInit() {
      this.networkListener = Network.addListener('networkStatusChange', (status) => {
        console.log("Network status changed", status);
        this.networkStatus = status;
      });
  
      this.networkStatus = await Network.getStatus();
    }
  
    ngOnDestroy() {
      this.networkListener.remove();
    }
  }