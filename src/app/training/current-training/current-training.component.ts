import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from '../past-trainings/exercise.model';
import { TrainingService } from '../training.service';
import { StopCurrentTrainingComponent } from './stop-current-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  theTimer: any;

  constructor(
    private dialog: MatDialog,
    private traiiningService: TrainingService
  ) {}

  ngOnInit(): void {
    this.timerStart();
  }

  timerStart() {
    const step =
      ((<Exercise>this.traiiningService.getRunningExercise()).duration / 100) *
      1000;
    this.theTimer = setInterval(() => {
      this.progress += 1;

      if (this.progress === 100) {
        this.traiiningService.finishExercise();
        clearInterval(this.theTimer);
      }
    }, step);
  }

  onStopTraining() {
    clearInterval(this.theTimer);
    const dialogRef = this.dialog.open(StopCurrentTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.traiiningService.cancelExercise(this.progress);
      } else {
        this.timerStart();
      }
    });
  }
}
