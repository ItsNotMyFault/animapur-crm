import { ref, type Ref } from 'vue'
import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'

const PAGE_MARGIN_MM = 10

export function useExportPdf() {
  const exporting = ref(false)

  async function exportPdf(element: HTMLElement | null | undefined, filename: string) {
    if (!element) return
    exporting.value = true
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      const imgWidth = pageWidth - PAGE_MARGIN_MM * 2
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      const imgData = canvas.toDataURL('image/jpeg', 0.95)

      const usablePageHeight = pageHeight - PAGE_MARGIN_MM * 2

      if (imgHeight <= usablePageHeight) {
        pdf.addImage(imgData, 'JPEG', PAGE_MARGIN_MM, PAGE_MARGIN_MM, imgWidth, imgHeight)
      } else {
        // Paginate: each page shows a vertical slice, accomplished by offsetting
        // the image upward and clipping to the page area.
        let position = PAGE_MARGIN_MM
        let heightLeft = imgHeight
        pdf.addImage(imgData, 'JPEG', PAGE_MARGIN_MM, position, imgWidth, imgHeight)
        heightLeft -= usablePageHeight

        while (heightLeft > 0) {
          pdf.addPage()
          position = PAGE_MARGIN_MM - (imgHeight - heightLeft)
          pdf.addImage(imgData, 'JPEG', PAGE_MARGIN_MM, position, imgWidth, imgHeight)
          heightLeft -= usablePageHeight
        }
      }

      pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`)
    } finally {
      exporting.value = false
    }
  }

  return { exporting, exportPdf } as { exporting: Ref<boolean>; exportPdf: typeof exportPdf }
}
