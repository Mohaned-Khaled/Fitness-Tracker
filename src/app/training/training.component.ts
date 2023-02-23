import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit, OnDestroy {
  currentTraining: boolean = false;
  exerciseSub: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSub = this.trainingService.isRunningExercise.subscribe(
      (exercise) => {
        if (exercise) this.currentTraining = true;
        else this.currentTraining = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.exerciseSub) this.exerciseSub.unsubscribe();
  }
}
