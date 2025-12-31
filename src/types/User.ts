export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export type UserType = {
  id: number;
  name: string;
  email: string;
  password?: string | null;
  role: Role;
  phone: string;
  picture?: string | null;
  status: UserStatus;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  posts?: PostType[];
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  thumbnail?: string | null;
  isFeatured: boolean;
  tags: string[];
  views: number;
  authorId: number;
  author?: UserType;
  createdAt: Date;
  updatedAt: Date;
};
