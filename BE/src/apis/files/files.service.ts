import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { IFfilesServiceUpload } from './interfaces/files-service.interface';

@Injectable()
export class FilesService {
  async upload({ file }: IFfilesServiceUpload): Promise<string> {
    // 1. 파일을 클라우드 스토리지에 저장하는 로직

    // 1-1) 스토리지 셋팅하기
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: 'gcp-file-storage.json',
    }).bucket(process.env.GCP_BUCKET);

    // 1-2) 스토리지에 파일 올리기
    const result = await new Promise<string>((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () => {
          resolve(`${process.env.GCP_BUCKET}/${file.filename}`);
        })
        .on('error', () => {
          reject('파일 업로드 실패');
        });
    });

    return result;
  }
}
