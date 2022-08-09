import { Component, NgZone } from '@angular/core';
import { DemoSharedNsSecureStorage } from '@demo/shared';
import {} from '@heywhy/ns-secure-storage';

@Component({
  selector: 'demo-ns-secure-storage',
  templateUrl: 'ns-secure-storage.component.html',
})
export class NsSecureStorageComponent {
  demoShared: DemoSharedNsSecureStorage;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNsSecureStorage();
  }
}
