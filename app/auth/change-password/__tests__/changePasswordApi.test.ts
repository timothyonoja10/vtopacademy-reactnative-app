import changePassword from "../changePasswordApi";

// Mock the fetch function globally
global.fetch = jest.fn();

describe('changePassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should change the password successfully', async () => {
    const mockResponse = { message: 'Password changed successfully' };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await changePassword('testuser', 'newpassword123', 'code123');
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the password change fails', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(changePassword('testuser', 'newpassword123', 'code123'))
     .rejects.toThrow('Unable to change password. Enter valid inputs and try again');
  });
});
