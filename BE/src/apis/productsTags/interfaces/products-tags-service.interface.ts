export interface IProductTagsServiceBulkInsert {
  names: {
    name: string;
  }[];
}

export interface IProductTagsServiceFindByNames {
  tagNames: string[];
}
