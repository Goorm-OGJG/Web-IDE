export interface containerDataType {
  containerId: number;
  containerName: string;
  containerUrl: string;
  containerLanguage: string;
  availableStorage: string;
  containerInfo: string;
  updatedDate: Date;
  createdDate: Date;
  pinned: false;
  owner: string;
  privated: false;
  userImg: userImgType[];
}
export interface userImgType {
  id: number;
  imgUrl: string;
  userName: string;
}
