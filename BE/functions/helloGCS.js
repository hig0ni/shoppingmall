import { Storage } from '@google-cloud/storage';
import sharp from 'sharp';

/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.generateThumbnail = (event, context) => {
  // event와 context의 데이터를 로그로 확인
  console.log('================');
  console.log('안녕하세요! 저는 트리거입니다');
  console.log(`event: ${JSON.stringify(event)}`);
  console.log(`context: ${JSON.stringify(context)}`);
  console.log('================');

  // 썸네일 생성 준비
  const originStorage = new Storage().bucket(process.env.GCP_BUCKET);
  const thumbStorage = new Storage().bucket(process.env.GCP_THUMBNAIL_BUCKET);

  // 파일 불러오기
  originStorage
    .file(event.name)
    .createReadStream()
    .pipe(sharp().resize({ width: 320 })) // 파일 크기 변경하기
    .pipe(thumbStorage.file(`thumb/${event.name}`).createWriteStream()) // 축소된 파일의 사진을 다른 버킷에 재업로드
    .on('finish', () => console.log('성공!'))
    .on('error', () => console.log('실패!'));
};
