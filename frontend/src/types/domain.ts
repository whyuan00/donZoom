interface ImageUri {
  id?: number;
  uri: string;
}

interface Profile {
  deletedAt: string;
  email: string;
  id: number;
  role: null;
  username: string;
}

export type {ImageUri, Profile};
