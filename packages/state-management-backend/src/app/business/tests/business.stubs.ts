export const businessStub = {
  userId: 'a',
  role: 'business',
  username: 'a',
  name: 'a',
  lastname: 'a',
  picture: 'a',
  email: 'a',
  password: 'a',
  isLoggedIn: false,
  contactNumber: 'a',
  businessId: 'a',
  businessName: 'a',
  refreshToken: 'a',
  rating: 2,
  contactPhoneNumber: 'a',
  longitude: '1',
  latitude: '1',
  contactAddress: 'a',
  deleted: false,
};

export const businessModificationDtoStub = {
  businessName: 'b',
  representativeName: 'b',
  address: 'b',
  latitude: '2',
  longitude: '2',
  contactNumber: '3',
  businessPicture: 'b',
};

export const initialBusinessCreationDtoStub = {
  businessName: 'b',
  representativeName: 'b',
  email: 'a',
  latitude: '2',
  longitude: '2',
  contactNumber: '3',
  password: '123',
  picture: 'a',
  contactAddress: 'a',
};

export const completeBusinessCreationDTO = {
  businessPicture: 'a',
  password: 'a',
};

export const BusinessClassificationStub = {
  businessClassificationId: 'g',
  name: 'p',
  description: 'd',
};

export const businessesStub = [businessStub];

export const paginatedBusinessessData = {
  data: businessesStub,
  page: 1,
  totalResults: businessesStub.length,
  totalPages: Math.ceil(businessesStub.length / 10),
};
