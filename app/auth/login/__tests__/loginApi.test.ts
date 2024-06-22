import makeLogin from "../loginApi";

// Mock the fetch function globally
global.fetch = jest.fn();

describe('makeLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully', async () => {
    const mockResponse = { token: 'test-token' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await makeLogin('testuser', 'testpassword');
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if login fails', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(makeLogin('testuser', 'testpassword'))
      .rejects.toThrow('Unable to login. Enter valid inputs and try again');
  });
});
