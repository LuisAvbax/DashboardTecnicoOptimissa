import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AdvancedFiltersComponent } from './dashboard/components/advanced-filters/advanced-filters.component';
import { InteractiveChartComponent } from './dashboard/components/interactive-chart/interactive-chart.component';
import { InteractiveChart2Component } from './dashboard/components/interactive-chart2/interactive-chart2.component';
import { InteractiveChart3Component } from './dashboard/components/interactive-chart3/interactive-chart3.component';
import { ExportService } from '../shared/services/export.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <h1
      style="
        text-align: center;
        font-family: 'Roboto', Arial, sans-serif;
        color: #4caf50;
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
        background: #f5f6fa;
        padding: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      "
    >
      Dashboard
    </h1>

    <button
      mat-raised-button
      color="primary"
      (click)="exportAllCharts()"
      style="margin: 1rem;"
    >
      Exportar Todos los Gráficos a PDF
    </button>

    <div
      class="dashboard-container"
      style="
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 2rem;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      "
    >
      <div
        style="
          flex: 0 0 calc(50% - 1rem);
          max-width: calc(50% - 1rem);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-sizing: border-box;
          min-height: 300px;
        "
      >
        <app-advanced-filters
          (filterChanged)="onFilterChange($event)"
        ></app-advanced-filters>
        <app-interactive-chart
          #chart1
          [filter]="selectedFilter"
        ></app-interactive-chart>
      </div>

      <div
        style="
          flex: 0 0 calc(50% - 1rem);
          max-width: calc(50% - 1rem);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-sizing: border-box;
          min-height: 300px;
        "
      >
        <app-interactive-chart2
          #chart2
          [filter]="selectedFilter"
        ></app-interactive-chart2>
      </div>

      <div
        style="
          flex: 0 0 100%;
          max-width: 50%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-sizing: border-box;
          min-height: 400px;
        "
      >
        <app-interactive-chart3 #chart3></app-interactive-chart3>
      </div>
    </div>

    <footer
      style="
        text-align: center;
        font-size: 0.875rem;
        color: #777;
        padding: 1rem;
        margin-top: 2rem;
        background-color: #f5f6fa;
        border-top: 1px solid #e0e0e0;
      "
    >
    </footer>
  `,
  styles: [
    `
      h1 {
        text-align: center;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    AdvancedFiltersComponent,
    InteractiveChartComponent,
    InteractiveChart2Component,
    InteractiveChart3Component,
  ],
})
export class DashboardPage {
  selectedFilter: string = '';

  @ViewChild('chart1') chart1!: InteractiveChartComponent;
  @ViewChild('chart2') chart2!: InteractiveChart2Component;
  @ViewChild('chart3') chart3!: InteractiveChart3Component;

  constructor(private exportService: ExportService) {}

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
  }

  exportAllCharts() {
    const canvas1 = this.chart1.chartCanvas.nativeElement;
    const canvas2 = this.chart2.chartCanvas.nativeElement;
    const canvas3 = this.chart3.chartCanvas.nativeElement;

    this.exportService.exportChartsAsPDF(
      [canvas1, canvas2, canvas3],
      'todos-los-graficos.pdf'
    );
  }
}
