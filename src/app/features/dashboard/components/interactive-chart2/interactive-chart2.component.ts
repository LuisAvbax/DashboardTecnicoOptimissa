import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { ExportService } from '../../../../shared/services/export.service';

@Component({
  selector: 'app-interactive-chart2',
  template: `
    <canvas #chartCanvas class="chart-canvas"></canvas>
    <button mat-button (click)="exportAsImage()">Exportar Gráfico</button>
  `,
  standalone: true,
  imports: [MatButtonModule],
})
export class InteractiveChart2Component
  implements OnChanges, AfterViewInit
{
  @Input() filter: string = '';
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;

  constructor(
    private http: HttpClient,
    private exportService: ExportService
  ) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] && !changes['filter'].firstChange) {
      this.updateChart();
    }
  }

  updateChart() {
    this.http
      .get<any[]>(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.filter}`
      )
      .subscribe((data) => {
        const labels = data.map((item) => item.id.toString());
        const values = data.map((item) => item.title.length);

        if (this.chart) {
          this.chart.destroy();
        }

        const ctx = this.chartCanvas.nativeElement.getContext('2d');

        this.chart = new Chart(ctx!, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: `Longitud de títulos del autor ${this.filter}`,
                data: values,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: { display: true },
              y: { display: true, beginAtZero: true },
            },
          },
        });
      });
  }

  exportAsImage() {
    this.exportService.exportChartAsImage(
      this.chartCanvas.nativeElement,
      'grafico2.png'
    );
  }
}
