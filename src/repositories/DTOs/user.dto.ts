export interface IRegisterUserDto {
  username: string;
  email: string;
  hashedPassword: string;
}

export interface IUpdateProfileDto {
  username: string;
  email: string;
  userId:string|undefined;

}


export interface ILoginDto {
  password: string;
  email: string;
}
