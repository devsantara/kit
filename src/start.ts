import { createMiddleware, createStart } from "@tanstack/react-start";

const requestMiddleware = createMiddleware({ type: "request" }).server(
  function handler({ next }) {
    return next();
  }
);

const functionMiddleware = createMiddleware({ type: "function" }).server(
  function handler({ next }) {
    return next();
  }
);

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [requestMiddleware],
    functionMiddleware: [functionMiddleware],
  };
});
