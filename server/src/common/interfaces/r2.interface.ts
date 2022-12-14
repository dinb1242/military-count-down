export interface ListObjectCommandParams {
  Bucket: string;
}

export interface GetObjectCommandParams {
  Bucket: string;
  Key: string;
}

export interface PutObjectCommandParams {
  Bucket: string;
  Key: string;
  Body: Buffer;
}