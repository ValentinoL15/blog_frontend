import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerService } from './spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinnerModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog_front';
  spinner = inject(SpinnerService);
}
