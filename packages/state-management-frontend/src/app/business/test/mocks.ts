import { Business } from '../models/business.interface';
import { Classification } from '../models/classification.interface';
import { ModalConfig } from '@clapp1/clapp-angular';

export const MOCK_CLASSIFICATIONS: Classification[] = [
  {
    name: 'classification1',
    description: 'description1',
    numberOfBusinesses: 3,
    image:
      'https://peruretail.sfo3.cdn.digitaloceanspaces.com/wp-content/uploads/newFile-4-scaled.jpg',
    id: '123sa',
  },
  {
    name: 'classification2',
    description: 'description',
    numberOfBusinesses: 6,
    image: 'https://images.freejpg.com.ar/900/1502/sad-face-F100036676.jpg',
    id: '564kio',
  },
  {
    name: 'classification3',
    description: 'description3',
    numberOfBusinesses: 4,
    image:
      'https://images.freejpg.com.ar/900/1003/modern-kitchen-architecture-F100031146.jpg',
    id: '893hgf',
  },
];

export const MOCK_FORM_VALUE = {
  name: 'Test Business',
  email: 'test@test.com',
  password: 'Test123!',
  classification: '1',
  address: 'Test Address',
  longitude: '0',
  latitude: '0',
  contact: '1234567890',
  picture: 'https://test.com/test.jpg',
  bankAccountNumber: '1234567890',
  bankName: 'Test Bank',
  bankAccountType: 'checking',
  fullname: 'Test User',
  documentId: '1234567890',
};

export const MOCK_FORM_CONTROLS = [
  'name',
  'email',
  'password',
  'classification',
  'address',
  'longitude',
  'latitude',
  'contact',
  'picture',
  'bankAccountNumber',
  'bankName',
  'bankAccountType',
  'fullname',
  'documentId',
];

export const MOCK_BUSINESS: Business = {
  name: 'New Business',
  email: 'newbusiness@example.com',
  password: 'Example!1',
  classification: 'Category 1',
  address: '123 Main St',
  longitude: '0',
  latitude: '0',
  contact: '555-5555',
  picture: '',
  bankAccountNumber: '1234567890',
  bankName: '',
  bankAccountType: '',
  fullname: 'John Doe',
  documentId: '1234567890',
};

export const TEST_DELETE_BUSINESS_MODAL_CONFIG: ModalConfig = {
  data: {
    title: 'Delete business',
    message: "Are you sure you want to delete the 'MY_BUSINESS' business?",
    affirmativeButtonLabel: 'Yes',
    negativeButtonLabel: 'Cancel',
  },
  width: '300px',
  height: 'fit-content',
};
