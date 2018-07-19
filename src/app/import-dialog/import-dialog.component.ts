import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss']
})
export class ImportDialogComponent implements OnInit {
  importControl = new FormControl('', [Validators.required]);
  constructor(public dialogRef: MatDialogRef<ImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any) {

  }

  ngOnInit() { }

  public onSave(): void {
    this.dialogRef.close({
      data: this.importControl.value
    });
  }
}
