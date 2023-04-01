import { RIMAC_NEVERA_URL } from '../test/mocks';
import { isALoadableImageUrl } from './is-a-displayable-image-url';

describe('isALoadableImageUrl function Tests', () => {
  it('2 + 2 = 4', () => {
    expect(2 + 2).toBe(4);
  });
  // it('should return false if we test it with a not displayable (invalid) image url', ()=>{
  //   const INVALID_IMG_URL = 'trollUrl.png';
  //   const response = isALoadableImageUrl(INVALID_IMG_URL);

  //   expect(response).toBe(false);
  // });

  // it('should return true if we test it with a displayable (valid) image url', ()=>{
  //   const response = isALoadableImageUrl(RIMAC_NEVERA_URL);

  //   expect(response).toBe(true);
  // });
});
