import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { Exercise } from './past-trainings/exercise.model';

@Injectable({ providedIn: 'root' })
export class TrainingService {
  private availableExercises: Exercise[];

  private runningExercise: Exercise;
  isRunningExercise = new Subject<Exercise | null>();
  finishedExercises = new Subject<Exercise[]>();
  exercisesChange = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore, private uiSerivce: UiService) {}

  fetchAvailableExercises() {
    this.uiSerivce.loadingSpinnerChange.next(true);
    this.db
      .collection('AvailableExercise')
      .snapshotChanges()
      .pipe(
        map((result) => {
          return result.map((data) => {
            return {
              id: data.payload.doc.id,
              ...(<Object>data.payload.doc.data()),
            };
          });
        })
      )
      .subscribe(
        (exercises: Exercise[]) => {
          this.uiSerivce.loadingSpinnerChange.next(false);
          this.availableExercises = exercises;
          this.exercisesChange.next(exercises);
        },
        (error) => {
          this.uiSerivce.loadingSpinnerChange.next(false);
          this.uiSerivce.showSnackBar(
            'Fetching Exercises failed, Try again later 💥',
            null,
            3000
          );
          this.exercisesChange.next(null);
        }
      );
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );

    if (this.runningExercise) {
      this.isRunningExercise.next({ ...this.runningExercise });
    }
  }

  finishExercise() {
    const currEx = <Exercise>this.runningExercise;
    this.addDataToDatabase({ ...currEx, date: new Date(), state: 'completed' });

    this.runningExercise = null;
    this.isRunningExercise.next(null);
  }

  cancelExercise(progress: number) {
    const currEx = <Exercise>this.runningExercise;
    this.addDataToDatabase({
      ...currEx,
      duration: currEx.duration * (progress / 100),
      calories: currEx.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });

    this.runningExercise = null;
    this.isRunningExercise.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe(
        (exercises: Exercise[]) => {
          this.finishedExercises.next(exercises);
        },
        (error) => {}
      );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
