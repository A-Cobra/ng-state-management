async function loadImage(url: string, elem: HTMLImageElement) {
  return new Promise((resolve, reject) => {
    elem.onload = () => resolve(true);
    elem.onerror = () => reject(false);
    elem.src = url;
  });
}
export async function isALoadableImageUrl(imageUrl: string) {
  const testImage = new Image();
  return await loadImage(imageUrl, testImage);
}
