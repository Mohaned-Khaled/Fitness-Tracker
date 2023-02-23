import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MaterialModule, FormsModule],
  exports: [CommonModule, FlexLayoutModule, MaterialModule, FormsModule],
})
export class SharedModule {}
