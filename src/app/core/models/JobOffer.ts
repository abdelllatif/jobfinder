export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  publishedAt: string;
  salary?: string;
  url: string;
  apiSource: string;
}
