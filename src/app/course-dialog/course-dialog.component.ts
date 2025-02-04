import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { fromEvent, noop, Observable } from 'rxjs';
import {
  concatMap,
  distinctUntilChanged,
  exhaustMap,
  filter,
  mergeMap,
  tap
} from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Store } from '../common/store.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;

  course: Course;

  @ViewChild('saveButton', { static: true })
  saveButton: ElementRef;

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        concatMap(changes => this.saveCourse(changes))
      )
      .subscribe();
  }

  saveCourse(changes) {
    return fromPromise(
      fetch(`/api/courses/${this.course.id}`, {
        method: 'Put',
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      })
    );
  }

  ngAfterViewInit() {
    fromEvent(this.saveButton.nativeElement, 'click')
      .pipe(exhaustMap(() => this.saveCourse(this.form.value)))
      .subscribe();
  }

  save() {}

  close() {
    this.dialogRef.close();
  }
}
