import { BusinessHq } from '../../../business/entities/business.entity';

export const mockBranchesResponse = {
  data: [
    {
      branchId: '632cbe18-ccc8-405e-a770-4b82e6399151',
      name: 'Mock Data',
      address: 'San Miguel, El Salvador',
      image: 'image.png',
      longitude: '44.043',
      latitude: '-299.91',
      openingTime: '08:00:00',
      closeTime: '16:00:00',
      contactEmail: 'example@gmail.com',
      deleted: false,
      contactPhoneNumber: '77867555',
      business: {
        userId: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
      } as BusinessHq,
    },
    {
      branchId: '632cbe18-ccc8-405e-a770-4b82e6399151',
      name: 'Mock Data',
      address: 'San Miguel, El Salvador',
      image: 'image.png',
      longitude: '44.043',
      latitude: '-299.91',
      openingTime: '08:00:00',
      deleted: false,
      closeTime: '16:00:00',
      contactEmail: 'example@gmail.com',
      contactPhoneNumber: '77867555',
      business: {
        userId: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
      } as BusinessHq,
    },
    {
      branchId: '632cbe18-ccc8-405e-a770-4b82e6399151',
      name: 'Mock Data',
      address: 'El Salvador',
      image: 'image.png',
      longitude: '44.043',
      deleted: false,
      latitude: '-299.91',
      openingTime: '08:00:00',
      closeTime: '16:00:00',
      contactEmail: 'example@gmail.com',
      contactPhoneNumber: '77867555',
      business: {
        userId: '6c84fb90-12c4-11e1-840d-7b25c5ee775a',
      } as BusinessHq,
    },
  ],
  totalResults: 3,
  page: 1,
  totalPages: 1,
};

export const createdBranchResponse = {
  branchId: '632cbe18-ccc8-405e-a770-4b82e6399151',
  name: 'Branch Test',
  address: 'San Miguel, El Salvador',
  image: 'image.png',
  longitude: '44.043',
  latitude: '-299.91',
  openingTime: '08:00:00',
  closeTime: '16:00:00',
  contactEmail: 'example@gmail.com',
  contactPhoneNumber: '77867555',
  deleted: false,
  businessId: { businessId: '6c84fb90-12c4-11e1-840d-7b25c5ee775a' },
};
