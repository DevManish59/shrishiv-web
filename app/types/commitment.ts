export interface CommitmentItem {
  title: string;
  description: string;
}

export interface CommitmentData {
  [lang: string]: CommitmentItem[];
}
