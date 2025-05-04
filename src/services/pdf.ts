import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const pdfService = {
  async generatePDF(element: HTMLElement, filename: string) {
    try {
      // Criar um clone do elemento para não modificar o original
      const clone = element.cloneNode(true) as HTMLElement

      // Garantir que o elemento está visível e com as dimensões corretas
      clone.style.position = 'absolute'
      clone.style.left = '-9999px'
      clone.style.top = '0'
      clone.style.width = '210mm'
      clone.style.margin = '0 auto'
      clone.style.backgroundColor = '#ffffff'

      document.body.appendChild(clone)

      // Aguardar um momento para garantir que o conteúdo foi renderizado
      await new Promise(resolve => setTimeout(resolve, 100))

      // Capturar o elemento como canvas
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })

      // Criar o PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      // Adicionar a imagem ao PDF
      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)

      // Verificar se precisa de múltiplas páginas
      if (pdfHeight > pdf.internal.pageSize.getHeight()) {
        const pageCount = Math.ceil(pdfHeight / pdf.internal.pageSize.getHeight())
        for (let i = 1; i < pageCount; i++) {
          pdf.addPage()
          pdf.addImage(
            imgData,
            'JPEG',
            0,
            -(pdf.internal.pageSize.getHeight() * i),
            pdfWidth,
            pdfHeight
          )
        }
      }

      // Salvar o PDF
      pdf.save(filename)

      // Limpar
      document.body.removeChild(clone)
    } catch (error) {
      console.error('Erro ao gerar PDF:', error)
      throw error
    }
  }
}
