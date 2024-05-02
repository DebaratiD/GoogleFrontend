export interface Book {
    author: string;
    lines: string[];
    title: string;
    images?: string[] 
  }

export interface query{
  ques:string,
  author: string,
  title: string,
}
