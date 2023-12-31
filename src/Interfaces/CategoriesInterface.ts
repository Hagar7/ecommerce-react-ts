
export interface CategoryInterface {
    results:  number;
    metadata: Metadata;
    data:     Category[];
}

export interface Category {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: string;
    updatedAt: string;
}

export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
}


export interface CategoryDetails {
    data: Category;
}