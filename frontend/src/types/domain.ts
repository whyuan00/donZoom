interface ImageUri {
  id?: number;
  uri: string;
}

interface Child {
  id: number;
  name: string;
  email: string;
  nickname: string;
}

interface Profile {
  email: string;
  id: number;
  isParent: null;
  name: string;
  profileImage: string;
  children: Child[];
}

export type {ImageUri, Profile, Child};
