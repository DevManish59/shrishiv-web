export interface Country {
  id: number;
  name: string;
  iso2: string;
  vatPercentage: number;
  subjectToVat: boolean;
  phoneCode: string;
  currency: string;
  currencyName: string;
  currencySymbol: string;
  language: string;
  inrToRate: number;
  published: boolean;
}

export interface Language {
  id: number | null;
  name: string;
  slug: string;
  data: {
    code: string;
  };
}
export interface SelectedCountry {
  countryCode: string;
  languageCode: string;
  // country: { code: string; name: string };
  // languages: { code: string; name: string };
}
