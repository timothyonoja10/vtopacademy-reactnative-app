
import makeRegistration from "../registerApi";

// Mock the fetch function globally
global.fetch = jest.fn();

describe('makeRegistration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register successfully', async () => {
    const mockResponse = { success: true, message: 'Registration successful' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await makeRegistration('testuser', 'password123');
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if registration fails', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: 'Invalid inputs' }),
    });

    await expect(makeRegistration('testuser', 'short'))
      .rejects.toThrow('Unable to register. Enter valid inputs and try again');
  });
});
