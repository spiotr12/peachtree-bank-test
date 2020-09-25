import { NameToImagePipe } from './name-to-image.pipe';


describe('NameToImagePipe', () => {
  let pipe: NameToImagePipe;
  beforeEach(() => {
    pipe = new NameToImagePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return positive value', () => {
    // Arrange
    const name = 'Lego Store US';
    const expected = 'lego-store-us.png';
    // Act
    const result = pipe.transform(name);
    // Assert
    expect(result).toEqual(expected);
  });
});
