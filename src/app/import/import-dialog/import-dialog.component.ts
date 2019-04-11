import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, AbstractControl } from '@angular/forms';

function validateJSON(c: AbstractControl) {
  return /^[\],:{}\s]*$/.test(c.value.replace(/\\["\\\/bfnrtu]/g, '@').
    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
    replace(/(?:^|:|,)(?:\s*\[)+/g, '')) ? null : { validJSON: false };
}

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss']
})
export class ImportDialogComponent implements OnInit {
  importControl = new FormControl('', [Validators.required, validateJSON]);
  save = false;
  clearWeeks = false;
  constructor(public dialogRef: MatDialogRef<ImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any) { }

  ngOnInit() { }

  public onSave(): void {
    this.dialogRef.close({
      data: this.importControl.value,
      save: this.save,
      clearWeeks: this.clearWeeks,
    });
  }
}
