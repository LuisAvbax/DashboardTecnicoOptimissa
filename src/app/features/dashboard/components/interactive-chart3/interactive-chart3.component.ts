import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Chart, registerables, ChartTypeRegistry } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { ExportService } from '../../../../shared/services/export.service';

@Component({
  selector: 'app-interactive-chart3',
  template: `
    <canvas #chartCanvas class="chart-canvas"></canvas>
    <button mat-button (click)="exportAsImage()">Exportar Gráfico</button>
  `,
  standalone: true,
  imports: [MatButtonModule],
})
export class InteractiveChart3Component
  implements OnInit, AfterViewInit
{
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart<'pie', number[], string>;

  constructor(
    private http: HttpClient,
    private exportService: ExportService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadChart();
  }

  loadChart() {
    this.http
      .get<any[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        const userPostCounts: { [key: string]: number } = {};

        data.forEach((post) => {
          userPostCounts[post.userId] =
            (userPostCounts[post.userId] || 0) + 1;
        });

        const labels = Object.keys(userPostCounts).map(
          (userId) => `Usuario ${userId}`
        );
        const values = Object.values(userPostCounts);

        if (this.chart) {
          this.chart.destroy();
        }

        const ctx = this.chartCanvas.nativeElement.getContext('2d');

        this.chart = new Chart<'pie', number[], string>(ctx!, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Número de posts por usuario',
                data: values,
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40',
                  '#C9CBCF',
                  '#FFCD56',
                  '#4D5360',
                  '#F7464A',
                ],
              },
            ],
          },
          options: {
            responsive: true,
          },
        });
      });
  }

  exportAsImage() {
    this.exportService.exportChartAsImage(
      this.chartCanvas.nativeElement,
      'grafico3.png'
    );
  }
}
