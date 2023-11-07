
export interface BrandDetails {
    data: Data;
}

export interface Data {
    _id:       string;
    name:      string;
    slug:      string;
    image:     string;
    createdAt: string;
    updatedAt: string;
    __v:       number;
}

export interface BrandInterface {
    results:  number;
    metadata: Metadata;
    data:     Brand[];
}

export interface Brand {
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
    nextPage:      number;
}
