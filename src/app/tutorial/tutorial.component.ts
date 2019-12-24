import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goToMath() {
    window.location.href = '/assets/mental-ukr.html';
  }

}
