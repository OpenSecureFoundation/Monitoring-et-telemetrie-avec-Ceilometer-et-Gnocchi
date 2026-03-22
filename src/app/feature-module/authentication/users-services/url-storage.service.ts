import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

// This is the url storage service class
// This service is used to store the url of the page
export class UrlStorageService {
private readonly LAST_URL_KEY = 'lastUrl';

  constructor(private router: Router) {
    // Sauvegarde l'URL lors de la fermeture ou du rafraîchissement
    window.addEventListener('beforeunload', () => {
      const currentUrl = this.router.url;
      localStorage.setItem(this.LAST_URL_KEY, JSON.stringify(currentUrl));
    });
  }

  getLastUrl(): string | null {
    const lastUrl = localStorage.getItem(this.LAST_URL_KEY);
    return lastUrl ? JSON.parse(lastUrl) : null;
  }

  clearLastUrl(): void {
    localStorage.removeItem(this.LAST_URL_KEY);
  }
}
