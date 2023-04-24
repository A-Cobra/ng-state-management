export const getCategoriesResponse = {
  data: [
    {
      categoryId: '1',
      name: 'Category 1',
      description: 'Category 1 description',
    },
    {
      categoryId: '2',
      name: 'Category 2',
      description: 'Category 2 description',
    },
  ],
  totalResults: 2,
  page: 1,
  totalPages: 1,
};

export const categorySearch = {
  data: [
    {
      categoryId: '1',
      name: 'Category 1',
    },
  ],
  totalResults: 1,
  page: 1,
  totalPages: 1,
};

export const singleCategory = {
  categoryId: '1',
  name: 'Category 2',
  description: 'Category 1 description',
};

export const categories = [singleCategory];

export const categoryUpdated = {
  categoryId: '1',
  name: 'Category 1',
  description: 'Description updated',
};
