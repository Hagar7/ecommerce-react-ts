
export interface SubCategoryResponse {
    results:  number;
    metadata: Metadata;
    data:     SubCategory[];
}

export interface SubCategory {
    _id:       string;
    name:      string;
    slug:      string;
    category:  string;
    createdAt: string;
    updatedAt: string;
}


export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
    nextPage:      number;
}


export interface SubCatgoryDetails {
    data: SubCategory;
}