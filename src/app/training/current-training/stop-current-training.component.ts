import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-current-training',
  template: `<div style="padding: 15px;">
    <h1 fxLayoutAlign="center">Are you sure?</h1>
    <mat-dialog-content fxLayoutAlign="center"
      >Your already got {{ passedData.progress }}</mat-dialog-content
    >
    <mat-dialog-actions fxLayoutAlign="center">
      <button mat-raised-button color="accent" [mat-dialog-close]="true">
        Yes
      </button>
      <button mat-raised-button color="primary" [mat-dialog-close]="false">
        No
      </button>
    </mat-dialog-actions>
  </div>`,
})
export class StopCurrentTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
