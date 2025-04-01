import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  read(file: Blob): Observable<any> {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Observable<any>((subscriber) => {
      reader.onload = async () => {
        try {
          const data = new Uint8Array(reader.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]]
          );
          subscriber.next(jsonData);
          subscriber.complete();
        } catch (error) {
          subscriber.error(error);
        }
      };
      reader.onerror = () => subscriber.error(reader.error);
    });
  }
}
