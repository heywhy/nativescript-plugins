import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNsSecureStorage } from '@demo/shared';
import {} from '@heywhy/ns-secure-storage';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNsSecureStorage {}
