import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

const accountId = process.env.R2_ACCOUNT_ID!;
const accessKeyId = process.env.R2_ACCESS_KEY_ID!;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY!;
const bucketName = process.env.R2_BUCKET_NAME!;

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

export async function putObject(
  key: string,
  body: Uint8Array,
  contentType?: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  });
  await client.send(command);
  return key;
}

export async function getObject(key: string): Promise<Uint8Array | null> {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const response = await client.send(command);
  const stream = response.Body;
  if (!stream) return null;
  return new Uint8Array(await stream.transformToByteArray());
}

export const R2_BUCKET = bucketName;
