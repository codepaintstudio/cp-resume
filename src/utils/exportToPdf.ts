import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * 导出 PDF，保证内容比例一致
 * @param {string} elementId 需要导出的 HTML 元素的 ID
 * @param {string} fileName 保存的 PDF 文件名
 */
export const exportToPDF = async (elementId: string, fileName: string = "resume.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("未找到指定的 HTML 元素");
    return;
  }

  // 让 html2canvas 生成更高分辨率的截图
  const scale = 3; // 设置缩放比例，避免模糊
  const canvas = await html2canvas(element, { scale });

  // 获取 Canvas 宽高
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;

  // 创建 PDF，并根据内容尺寸动态调整
  const pdf = new jsPDF("p", "mm", "a4"); // A4 纵向
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // 计算缩放比例，保持宽高比一致
  const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
  const pdfWidth = imgWidth * ratio;
  const pdfHeight = imgHeight * ratio;

  // 添加图片到 PDF
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
};
