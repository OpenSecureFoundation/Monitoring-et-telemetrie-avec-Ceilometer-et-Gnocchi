export interface User {
  jwt?: string;
  keystoneToken?: string;
  user: {
    domain?: {
      id?: string;
      name?: string;
    };
    userId?: string;
    name?: string;
    passwordExpiresAt?: string | null;
  };
}
