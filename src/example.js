import { init, getEnv } from './index.js';

// init({path : './secret-manager'});
await init();


const s3Key = getEnv("S3_BUCKET");
console.log(s3Key);

const awsKey2 = getEnv("DAMAPIKEY");
console.log(awsKey2);

const isProject = getEnv("ISPROJECT");
console.log(typeof isProject, isProject);

const num = getEnv("NUM");
console.log(typeof num, num);

const num2 = getEnv("NUM2");
console.log(typeof num2, num2);