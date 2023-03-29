export function isALoadableImageUrl(imageUrl: string): boolean {
  // Create new offscreen image to test
  const testImage = new Image();
  testImage.src = imageUrl;
  if (testImage.width > 0 && testImage.height > 0) {
    return true;
  } else {
    return false;
  }
}
