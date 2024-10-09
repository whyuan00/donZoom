interface ImageUri {
  id?: number;
  uri: string;
}

interface Profile {
  email: string;
  id: number;
  isParent: null;
  name: string;
  profileImage: string;
}

export type {ImageUri, Profile};
