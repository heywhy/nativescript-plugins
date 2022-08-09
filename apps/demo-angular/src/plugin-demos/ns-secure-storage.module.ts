import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NsSecureStorageComponent } from './ns-secure-storage.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NsSecureStorageComponent }])],
  declarations: [NsSecureStorageComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NsSecureStorageModule {}
