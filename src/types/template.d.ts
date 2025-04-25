// export interface Template {
//   id: string;
//   title: string;
//   imageUrl?: string;
//   style: string;
//   industry: string;
//   color: string;
//   size?: string;
//   author?: string;
// }
// export interface Template {
//   id: string;
//   name: string;
//   description?: string;
//   folderPath: string;
//   thumbnail?: string;
//   layout?: string;
//   style: string;
//   industry: string;
//   color: string;
//   setting: {
//     themeColor:string,
//     fontColor:string,
//     fontFamily:string,
//     lineSpacing: number,
//     blockSpacing:number,
//     pageMargin: number
//   }
// }
export interface Template {
  resumeTemplateId: string;
  resumeTemplateName: string;
  resumeTemplateContent: {
    layout: string;
    thumbnail: string;
    folderPath: string;
    color: string;
    style: string;
    industry: string;
    description: string;
    setting: {
      fontColor: string;
      fontFamily: string;
      pageMargin: number;
      themeColor: string;
      lineSpacing: number;
      blockSpacing: number;
    };
  }
  resumeTemplateCreateTime?: string,
  resumeTemplateUpdateTime?: string
 }
