/**
 * It is used to format the payload when the token is encoded.
 */
export interface PayloadEncodeInterface {
  groupId: number;
  username: string;
  fullname: string;
  sub: number;
}

/**
 * It is used to format the payload when the token is decoded.
 */
export interface PayloadDecodeInterface {
  groupId: number;
  username: string;
  fullname: string;
  userId: number;
}
