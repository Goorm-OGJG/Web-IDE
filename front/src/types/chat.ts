export interface ChatUserDataType {
  email: string;
  userImg: string;
  userName: string;
}

export interface ChatInitialDataType {
  type: string;
  email: string;
  userImg: string;
  sender: string;
  content: string;
  createdAt: Date;
}
