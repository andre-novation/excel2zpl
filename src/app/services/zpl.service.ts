import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface Zpl {
  CLIENTE_PROGETTO: string;
  DESCRIZIONE: string;
  CODICE: string;
}

@Injectable({ providedIn: 'root' })
export class ZplService {
  constructor() {}

  getZpl(db: Zpl[]) {
    if (db.length === 0) return of(null);

    let command = '';
    db.forEach((data) => {
      command += `
      ^XA
      ^PW1181
      ^LL354

      ^FO0,50
      ^A0N,40,40
      ^FB1181,1,0,C
      ^FD${data.CLIENTE_PROGETTO}
      ^FS

      ^FO0,140
      ^A0N,70,70
      ^FB1181,1,0,C
      ^FD${data.DESCRIZIONE}
      ^FS

      ^FO0,230
      ^A0N,40,40
      ^FB1181,1,0,C
      ^FD${data.CODICE}
      ^FS

      ^XZ
      `;
    });

    return of(command);
  }
}
