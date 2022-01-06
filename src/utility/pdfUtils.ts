import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { parseDate } from "./DateUtils";

export const downloadPdf = (divToPrint: string) => {
  const input = document.getElementById(divToPrint);
  html2canvas(input!)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0, 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save(`${divToPrint}_${parseDate(new Date())}.pdf`);
    })
  ;
}

export const renderBlankSpace = (spaces: number): string => {
  let blankSpace = '';

  for (let index = 0; index < spaces; index++) {
    blankSpace += '_';
  }

  return blankSpace;
}