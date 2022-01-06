import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPdf = () => {
  const input = document.getElementById('contract');
  html2canvas(input!)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0, 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("contract.pdf");
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