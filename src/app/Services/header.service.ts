import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private token: string = '';
  public headers: HttpHeaders = new HttpHeaders();

  constructor(private sessionStorage: SessionStorageService) {
    // Trae el objeto del sessionStorage
    const stored = this.sessionStorage.getItem('token');

    // Si existe, asigna el token, si no queda vacío
    this.token = stored?.token || '';

    if (this.token) {
      console.log('Token encontrado:', this.token);

      this.headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: this.token, // 👈
      });
    }
  }
}
