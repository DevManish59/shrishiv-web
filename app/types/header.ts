export interface DynamicCategory {
  id: number;
  name: string;
  slug: string;
  categories: HeaderCategory[];
  featured: HeaderCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  featured: boolean;
}
export interface ParentCategory {
  id: number;
  name: string;
  slug: string;
  subCategories: SubCategory[];
}

export interface HeaderCategory {
  id?: number;
  label: string;
  slug: string;
}
