import { LabelaryService, labelOptions } from './../services/labelary.service';
import { Component, inject } from '@angular/core';
import { switchMap, take } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ExcelService } from '../services/excel.service';
import { ZplService } from '../services/zpl.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { Fluid } from 'primeng/fluid';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-conversor',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    FileUploadModule,
    CardModule,
    SelectModule,
    InputNumberModule,
    InputGroupModule,
    Fluid,
    FloatLabelModule,
    ImageModule,
  ],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.scss',
})
export class ConversorComponent {
  private readonly excelService = inject(ExcelService);
  private readonly zplService = inject(ZplService);
  private readonly labelary = inject(LabelaryService);
  private readonly fb = inject(FormBuilder);

  previewImage: string | null = null;
  widthImage: string = '0';
  heightImage: string = '0';

  unitOptions = this.labelary.unitOptions;
  densityOptions = this.labelary.densityOptions;

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      density: ['12dpmm', Validators.required],
      width: [100, Validators.required],
      height: [30, Validators.required],
      index: [0, Validators.required],
      unity: ['mm', Validators.required],
      zpl: [``, Validators.required],
    });
  }

  insertExcell(file: any) {
    console.log('test');
    this.excelService
      .read(file.files[0])
      .pipe(
        take(1),
        switchMap((res: any) => this.zplService.getZpl(res))
      )
      .subscribe({
        next: (res: any) => this.form.patchValue({ zpl: res }),
        error: (error) => console.log('Subscription error:', error),
      });
  }

  getLabelPreview() {
    if (!this.form.value) return;

    const opt: labelOptions = {
      ...this.form.value,
    };

    this.labelary
      .getLabel(opt)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          const reader = new FileReader();
          reader.onload = () => {
            this.widthImage = (opt.width * 5).toFixed(2);
            this.heightImage = (opt.height * 5).toFixed(2);
            this.previewImage = reader.result as string;
          };
          reader.readAsDataURL(res);
        },
        error: (error) => console.log('Subscription error:', error),
      });
  }

  copyToClipboard() {
    if (this.form.value.zpl) {
      navigator.clipboard
        .writeText(this.form.value.zpl)
        .then(() => alert('Content copied to clipboard!'))
        .catch((err) => console.error('Failed to copy to clipboard: ', err));
    } else {
      alert('Nothing to copy!');
    }
  }
}
