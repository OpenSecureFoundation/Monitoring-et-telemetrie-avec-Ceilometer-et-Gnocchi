let keystoneToken = null;
let keystoneAuth = null;

// Set keystone token
export const setKeystoneToken = (token) => {
  keystoneToken = token;
};

// Get keystone token
export const getKeystoneToken = () => keystoneToken;

// Set keystone auth
export const setKeystoneAuth = (auth) => {
  keystoneAuth = auth;
};

// Get keystone auth
export const getKeystoneAuth = () => keystoneAuth;
