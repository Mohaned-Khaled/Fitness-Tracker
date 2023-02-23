import { NgModule } from '@angular/core';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopCurrentTrainingComponent } from './current-training/stop-current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingComponent } from './training.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { SharedModule } from '../shared/shared.module';
import { TrainingAuthModule } from './training-auth.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
  ],
  imports: [SharedModule, AngularFirestoreModule, TrainingAuthModule],
  exports: [],
  entryComponents: [StopCurrentTrainingComponent],
})
export class TrainingModules {}
