import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { Exercise } from '../past-trainings/exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  trainings: Exercise[];
  theSub: Subscription;
  isLoading: boolean = false;
  loadingSub: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingSpinnerChange.subscribe((bol) => {
      this.isLoading = bol;
    });
    this.trainingService.fetchAvailableExercises();

    this.theSub = this.trainingService.exercisesChange.subscribe(
      (exercises: Exercise[]) => {
        this.trainings = exercises;
      }
    );
  }

  onSubmit(exForm: NgForm) {
    this.trainingService.startExercise(exForm.value.exercise);
  }

  onFetchAgain() {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    if (this.theSub) this.theSub.unsubscribe();
    if (this.loadingSub) this.loadingSub.unsubscribe();
  }
}
