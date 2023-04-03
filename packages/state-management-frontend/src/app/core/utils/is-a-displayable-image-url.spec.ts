import { RIMAC_NEVERA_URL } from '../test/mocks';
import { isALoadableImageUrl } from './is-a-displayable-image-url';

describe('isALoadableImageUrl function Tests', () => {
  it('should return false if we test it with a not displayable (invalid) image url', async () => {
    const INVALID_IMG_URL = 'trollUrl.png';
    isALoadableImageUrl(INVALID_IMG_URL).catch((response) => {
      expect(response).toBe(false);
    });
  });

  it('should return true if we test it with a displayable (valid) image url', async () => {
    isALoadableImageUrl(RIMAC_NEVERA_URL).then((response) => {
      expect(response).toBe(true);
    });
  });
});
