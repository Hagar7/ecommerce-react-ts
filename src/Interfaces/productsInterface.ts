
export interface ProductsResponse {
    results:  number;
    metadata: Metadata;
    data:     Product[];
}

export interface Product {
    sold:                number;
    images:              string[];
    subcategory:         Brand[];
    ratingsQuantity:     number;
    _id:                 string;
    title:               string;
    slug:                string;
    description:         string;
    quantity:            number;
    price:               number;
    imageCover:          string;
    category:            Brand;
    brand:               Brand;
    ratingsAverage:      number;
    createdAt:           string;
    updatedAt:           string;
    id:                  string;
    priceAfterDiscount?: number;
    availableColors?:    any[];
}

export interface Brand {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: string;
}



export interface Metadata {
    currentPage:   number;
    numberOfPages: number;
    limit:         number;
    nextPage:      number;
}




export interface ProductDetails {
    data: Product;
}




