import Alpine from "alpinejs";
import ui from "@alpinejs/ui";
import focus from "@alpinejs/focus";

// Import Components
import panels from "./components/panels";
import chartLine from "./components/chartLine";

// PDF
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

document.addEventListener("DOMContentLoaded", () => {
  window.Alpine = Alpine;

  // AlpineJS Components: Headless UI
  // https://alpinejs.dev/components
  Alpine.plugin(ui);

  // AlpineJS PLugin: Collapse for smooth animations
  Alpine.plugin(focus);

  Alpine.data("panels", panels);
  Alpine.data("chartLine", chartLine);

  Alpine.start();


  setTimeout(() => {

    return false 
    
    const pdf = new jsPDF();
    const element = document.querySelector('.a4');

    // pdf.html(element, {
    //   callback: function (pdf) {

    //     // Save the PDF to a file or display it
    //     pdf.save("output.pdf");
    //   },
    //   html2canvas: { scale: 0.5 }
    // });


    // const element = document.querySelector('.a4') // Get the HTML element to be converted to PDF
    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL("image/png"); // Convert canvas to image data
      const pdf = new jsPDF(); // Initialize jsPDF
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // Add image to PDF
      pdf.save('converted-document.pdf'); // Save PDF
    });

  //   html2canvas(element, { scale: 5 }).then(canvas => { // { scale: 5 }
  //     // const context = canvas.getContext('2d')
  //     // context['imageSmoothingEnabled'] = false /* standard */
  //     // context['mozImageSmoothingEnabled'] = false /* Firefox */
  //     // context['oImageSmoothingEnabled'] = false /* Opera */
  //     // context['webkitImageSmoothingEnabled'] = false /* Safari */
  //     // context['msImageSmoothingEnabled'] = false /* IE */

  //     // const doc = new jsPDF()
  //     // const pdfWidth = doc.internal.pageSize.getWidth();
  //     // const pdfHeight = (context.canvas.height * pdfWidth) / context.canvas.width;
  //     // doc.addImage(canvas, 'JPEG', 0, 0, pdfWidth, pdfHeight)
  //     // doc.save("converted-document.pdf")
  //     const context = canvas.getContext('2d')
  //     context['imageSmoothingEnabled'] = false /* standard */
  //     context['mozImageSmoothingEnabled'] = false /* Firefox */
  //     context['oImageSmoothingEnabled'] = false /* Opera */
  //     context['webkitImageSmoothingEnabled'] = false /* Safari */
  //     context['msImageSmoothingEnabled'] = false /* IE */

  //     const doc = new jsPDF({ orientation: 'landscape' })
  //     const width = Math.floor(doc.internal.pageSize.getWidth())
  //     const height = Math.floor(doc.internal.pageSize.getHeight())
  //     doc.addImage(canvas, 'JPEG', 0, 0, width, height)
  //     doc.addImage(canvas, 'JPEG', 0, 0, )
  //     doc.save("converted-document.pdf")
  //   })

  }, 250)
});
