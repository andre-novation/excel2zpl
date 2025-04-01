import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type DensityOptions = '6dpmm' | '8dpmm' | '12dpmm' | '24dpmm';
export type UnitOptions = 'inches' | 'cm' | 'mm';

export type labelOptions = {
  density: DensityOptions;
  width: number;
  height: number;
  index: number;
  zpl: string;
  units: UnitOptions;
};

@Injectable({ providedIn: 'root' })
export class LabelaryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.labelary.com/v1/printers';

  private FACTORS = { inches: 1, cm: 0.393701, mm: 0.0393701 };

  unitOptions = [
    { label: 'cm', value: 'cm' },
    { label: 'mm', value: 'mm' },
    { label: 'inches', value: 'inches' },
  ];

  densityOptions = [
    { label: '6 dpmm (152 dpi)', value: '6dpmm' },
    { label: '8 dpmm (203 dpi)', value: '8dpmm' },
    { label: '12 dpmm (300 dpi)', value: '12dpmm' },
    { label: '24 dpmm (600 dpi)', value: '24dpmm' },
  ];

  private buildLabelaryUrl = (opt: labelOptions) => {
    const factor = this.FACTORS['mm'];
    const widthInches = opt.width * factor;
    const heightInches = opt.height * factor;
    // const result = `${this.baseUrl}/${opt.density}/labels/${widthInches}x${heightInches}/${opt.index}/${opt.zpl}/`;

    const result = `${this.baseUrl}/${opt.density}/labels/${widthInches}x${heightInches}/${opt.index}/`;
    console.log(result);

    return result;
  };

  getLabel(opt: labelOptions) {
    const headers = {
      Accept: 'image/png',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = opt.zpl;

    return this.http.post(this.buildLabelaryUrl(opt), body, {
      headers,
      responseType: 'blob',
    });
  }
}
