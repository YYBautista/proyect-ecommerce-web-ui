import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object
  ) {}

  public setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  public getItem<T = any>(key: string): T | null {
    if (isPlatformBrowser(this.platformId)) {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    }
    return null;
  }

  public removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(key);
    }
  }

  public clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.clear();
    }
  }
}
