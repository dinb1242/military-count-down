import {
  DeleteObjectCommandParams,
  GetObjectCommandParams,
  ListObjectCommandParams,
  PutObjectCommandParams
} from "../interfaces/r2.interface";
import { s3Client } from "../libs/r2-client.lib";
import { DeleteObjectCommand, GetObjectCommand, ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";

/**
 * Cloudflare R2 Util Class
 * Author: Jihyun, Jeong
 * Date: 2022.12.14.
 */
const bucketName = process.env.R2_BUCKET_NAME;

@Injectable()
export class R2Utils {
  /**
   * 오브젝트를 업로드한다.
   * @param key 오브젝트 파일명 (경로도 포함 가능)
   * @param buffer 오브젝트 파일 버퍼
   */
  async uploadObject(key: string, buffer: Buffer) {
    const putObjectCommandParams: PutObjectCommandParams = {
      Bucket: bucketName,
      Key: key,
      Body: buffer
    }
    return s3Client.send(new PutObjectCommand(putObjectCommandParams));
  }

  /**
   * 오브젝트를 가져온다.
   * @param key 가져올 오브젝트 경로/파일명
   */
  async getObject(key: string) {
    const getObjectCommandParams: GetObjectCommandParams = {
      Bucket: bucketName,
      Key: key
    }
    return s3Client.send(new GetObjectCommand(getObjectCommandParams));
  }

  /**
   * 버킷 내의 전체 오브젝트 리스트를 가져온다.
   */
  async getObjectList() {
    const listObjectCommandParams: ListObjectCommandParams = {
      Bucket: bucketName,
    }
    return s3Client.send(new ListObjectsCommand(listObjectCommandParams));
  }

  async deleteObject(key: string) {
    const deleteObjectCommandParams: DeleteObjectCommandParams = {
      Bucket: bucketName,
      Key: key
    };

    return s3Client.send(new DeleteObjectCommand(deleteObjectCommandParams));
  }
}