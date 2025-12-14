export type CaseStudySection = {
  title: string;
  content: string;
  highlights?: string[];
};

export type CaseStudy = {
  /** The problem being solved */
  problem: CaseStudySection;
  /** The development process and methodology */
  process: CaseStudySection;
  /** The technical solution implemented */
  solution: CaseStudySection;
  /** The outcomes and results achieved */
  results: CaseStudySection;
  /** Optional key metrics to display */
  metrics?: {
    label: string;
    value: string;
  }[];
  /** Screenshots or demo images */
  gallery?: string[];
};
