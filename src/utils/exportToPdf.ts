import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * 导出 PDF，优化文件大小
 * @param {string} elementId 需要导出的 HTML 元素的 ID
 * @param {string} fileName 保存的 PDF 文件名
 */
export const exportToPDF = async (elementId: string, fileName: string = "resume.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("未找到指定的 HTML 元素");
    return;
  }

  // 优化参数配置
  const scale = 2; // 降低分辨率
  const jpegQuality = 0.7; // JPEG 压缩质量 (0-1)

  // 生成 JPEG 格式的 Canvas
  const canvas = await html2canvas(element, {
    scale,
    useCORS: true, // 允许跨域图片
    logging: false,
    backgroundColor: "#FFFFFF", // 防止透明背景转 JPEG 变黑
    onclone: (clonedDoc) => {
      // 可选：克隆文档时隐藏不需要的元素
      const targetElement = clonedDoc.getElementById(elementId);
      if (targetElement) targetElement.style.boxShadow = "none"; // 移除阴影效果
    }
  });

  // 页面尺寸计算
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = pageWidth / imgWidth; // 宽度缩放比例

  // 分页处理
  let currentPosition = 0;
  while (currentPosition < imgHeight) {
    // 计算当前页面的 Canvas 高度
    const sectionHeight = Math.min(
      (pageHeight / ratio) * 0.95, // 留白边距
      imgHeight - currentPosition
    );

    // 创建分页 Canvas
    const sectionCanvas = document.createElement("canvas");
    sectionCanvas.width = imgWidth;
    sectionCanvas.height = sectionHeight;
    const ctx = sectionCanvas.getContext("2d")!;

    // 绘制当前页面内容
    ctx.drawImage(
      canvas,
      0, currentPosition,
      imgWidth, sectionHeight,
      0, 0,
      imgWidth, sectionHeight
    );

    // 转换为 JPEG 并添加到 PDF
    const imgData = sectionCanvas.toDataURL("image/jpeg", jpegQuality);
    if (currentPosition > 0) pdf.addPage();
    pdf.addImage(
      imgData,
      "JPEG",
      0, 0,
      pageWidth,
      sectionHeight * ratio,
      undefined,
      "FAST" // 启用快速压缩
    );

    currentPosition += sectionHeight;
  }

  pdf.save(fileName);
};
