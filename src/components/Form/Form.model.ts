export interface IUser {
  id: number
  name: string
  email: string
  address: object
  phone: string
  website: string
  company: object
}

export enum Messages {
  FetchFail = "Oops, could not fetch the users, please try again later.",
  PostFail = "Submission failed, please try again later.",
  PostSuccess = "Information has been submitted successfully.",
  OptionRequired = "Please Select a User."
}