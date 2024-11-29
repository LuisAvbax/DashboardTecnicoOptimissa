import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  exportToCSV(data: any[], filename: string) {
    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  }

  private convertToCSV(objArray: any[]): string {
    const array = objArray;
    let csv = '';

    // Obtener encabezados
    const headers = Object.keys(array[0]).join(',');
    csv += headers + '\r\n';

    // Agregar filas
    array.forEach((item) => {
      const row = Object.values(item)
        .map((value) => `"${value}"`)
        .join(',');
      csv += row + '\r\n';
    });

    return csv;
  }

  exportChartAsImage(chartCanvas: HTMLCanvasElement, filename: string) {
    const image = chartCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = filename;
    link.click();
  }

  exportChartsAsPDF(chartCanvases: HTMLCanvasElement[], filename: string) {
    const doc = new jsPDF();

    chartCanvases.forEach((canvas, index) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 180; // Ajusta según sea necesario
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (index > 0) {
        doc.addPage();
      }

      doc.addImage(imgData, 'PNG', 15, 15, imgWidth, imgHeight);
    });

    doc.save(filename);
  }
}
