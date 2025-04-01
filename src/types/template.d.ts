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
export interface Template {
  id: string;
  name: string;
  description?: string;
  folderPath: string;
  thumbnail?: string;
  layout?: string;
  style: string;
  industry: string;
  color: string;
}
