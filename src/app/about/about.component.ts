import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { noop } from 'rxjs';
import { createHttpObserbale } from '../util/util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  ngOnInit() {}
}
