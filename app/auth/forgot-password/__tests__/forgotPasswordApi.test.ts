import generateForgotPasswordCode from "../forgotPasswordApi";

describe('generateForgotPasswordCode', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('should return false if fetch fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const result = await generateForgotPasswordCode('testuser');
    expect(result).toBe(false);
  });

  it('should return true if fetch succeeds', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
    });

    const result = await generateForgotPasswordCode('testuser');
    expect(result).toBe(true);
  });
});
