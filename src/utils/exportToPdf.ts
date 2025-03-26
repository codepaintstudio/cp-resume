import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * 导出 PDF，支持分页，保证内容比例一致
 * @param {string} elementId 需要导出的 HTML 元素的 ID
 * @param {string} fileName 保存的 PDF 文件名
 */
export const exportToPDF = async (elementId: string, fileName: string = "resume.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("未找到指定的 HTML 元素");
    return;
  }

  const scale = 3; // 提高分辨率，防止模糊
  const canvas = await html2canvas(element, { scale });

  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const ratio = pageWidth / imgWidth; // 计算缩放比例
  // const scaledHeight = imgHeight * ratio; // 按比例缩放后的总高度

  let positionY = 0; // 当前绘制的位置
  let pageIndex = 0;

  while (positionY < imgHeight) {
    if (pageIndex > 0) {
      pdf.addPage();
    }

    const sectionCanvas = document.createElement("canvas");
    sectionCanvas.width = imgWidth;
    sectionCanvas.height = Math.min(imgHeight - positionY, pageHeight / ratio); // 剩余高度

    const ctx = sectionCanvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(canvas, 0, positionY, imgWidth, sectionCanvas.height, 0, 0, imgWidth, sectionCanvas.height);
    }

    pdf.addImage(sectionCanvas.toDataURL("image/png"), "PNG", 0, 0, pageWidth, sectionCanvas.height * ratio);
    positionY += sectionCanvas.height; // 计算下一页的起始位置
    pageIndex++;
  }

  pdf.save(fileName);
};
