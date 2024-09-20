interface ImageUri {
  id?: number;
  uri: string;
}

interface Profile {
  id: number;
  role: null;
  email: string;
  username: string;
  deletedAt: null;
}

export type {ImageUri, Profile};
