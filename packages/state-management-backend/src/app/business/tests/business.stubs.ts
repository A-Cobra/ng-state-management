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
  businesName: 'a',
  businessPicture: 'a',
  contactEmail: 'a',
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
  address: 'b',
  latitude: '2',
  longitude: '2',
  contactNumber: '3',
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
  currentPage: 1,
  totalItems: businessesStub.length,
  totalPages: Math.ceil(businessesStub.length / 10),
};
