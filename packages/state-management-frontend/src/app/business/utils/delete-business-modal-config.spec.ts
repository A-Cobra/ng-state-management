import { TEST_DELETE_BUSINESS_MODAL_CONFIG } from '../test/mocks';
import { deleteBusinessModalConfig } from './delete-business-modal-config';

describe('deleteBusinessModalConfig Test', () => {
  it('should return a specific Modal Config once we send a business name', () => {
    const BUSINESS_NAME = 'MY_BUSINESS';
    expect(deleteBusinessModalConfig(BUSINESS_NAME)).toStrictEqual(
      TEST_DELETE_BUSINESS_MODAL_CONFIG
    );
  });
});
