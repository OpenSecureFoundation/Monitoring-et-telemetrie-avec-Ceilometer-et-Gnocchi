let keystoneToken = null;
let keystoneAuth = null;
let name = null;
let passwd = null;

// Set keystone token
export const setKeystoneToken = (token) => {
  keystoneToken = token;
  console.log("Keystone token cached: ", keystoneToken);
};

// Get keystone token
export const getKeystoneToken = () => keystoneToken;

// Set keystone auth
export const setKeystoneAuth = (auth) => {
  keystoneAuth = auth;
};

// Get keystone auth
export const getKeystoneAuth = () => keystoneAuth;
