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
  selector: 'app-interactive-chart',
  template: `
    <canvas #chartCanvas class="chart-canvas"></canvas>
    <button mat-button (click)="exportAsImage()">Exportar Gráfico</button>
  `,
  standalone: true,
  imports: [MatButtonModule],
})
export class InteractiveChartComponent implements OnChanges, AfterViewInit {
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
        const values = data.map((item) => item.id * 10);

        if (this.chart) {
          this.chart.destroy();
        }

        const ctx = this.chartCanvas.nativeElement.getContext('2d');

        this.chart = new Chart(ctx!, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: `Datos del autor ${this.filter}`,
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
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
      'grafico1.png'
    );
  }
}
