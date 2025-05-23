/* eslint-disable no-undef */
const mockNoop = () => new Promise(() => {});

export default {
  get: jest.fn(() => Promise.resolve({ data: { total_payout: 100.21 } })),
  default: mockNoop,
  post: mockNoop,
  put: mockNoop,
  delete: mockNoop,
  patch: mockNoop,
  create: jest.fn((config) => {
    // This function should return an object that looks like an Axios instance.
    // It must have `interceptors.request.use` and `interceptors.response.use`.
    const instance = {
      defaults: { ...(config || {}) }, // Axios instances have a defaults property
      interceptors: {
        request: {
          use: jest.fn(),
          eject: jest.fn(),
          clear: jest.fn(), // Added trailing comma
        },
        response: {
          use: jest.fn(),
          eject: jest.fn(),
          clear: jest.fn(), // Added trailing comma
        },
      },
      // Mock common HTTP methods an instance would have
      get: jest.fn(() => Promise.resolve({ data: {} })),
      post: jest.fn(() => Promise.resolve({ data: {} })),
      put: jest.fn(() => Promise.resolve({ data: {} })),
      delete: jest.fn(() => Promise.resolve({ data: {} })),
      patch: jest.fn(() => Promise.resolve({ data: {} })),
      // Add any other methods or properties your code might use on an Axios instance
    };
    return instance;
  }),
};
