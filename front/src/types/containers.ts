export interface containerDataType {
  containerId: number;
  name: string;
  containerUrl: string;
  language: string;
  storage: string;
  info: string;
  updatedDate: Date;
  createdDate: Date;
  pinned: false;
  owner: string;
  private: false;
  usersImg: userImgType[];
}
export interface userImgType {
  id: number;
  imgUrl: string;
  userName: string;
}
