# 🧩 smart-env

> A safer, smarter `.env` manager for Node.js and TypeScript projects.  
> Validate, type, and secure your environment variables — with zero hassle.

---

## 🚀 Why smart-env?

Environment variables are critical — but `.env` files are easy to mess up.

- Missing keys cause silent runtime errors.  
- Values are often the wrong type (e.g., `"true"` instead of `true`).  
- Secrets can leak accidentally.  
- No type safety in TypeScript.

`smart-env` fixes that with:
- ✅ **Schema validation**
- ⚡ **TypeScript type generation**
- 🔐 **Optional encryption**
- 🧠 **Developer-friendly CLI**

---

## 📦 Installation

```bash
npm install smart-env
# or
pnpm add smart-env
# or
yarn add smart-env
```

## Usage

### Import and Initialization
```javascript
import { init, getEnv } from './index.js';

// Initialize smart-env (you can pass a config with path if needed)
// await init({ path: './secret-manager' });
await init();
```
> init() merges loaded environment variables into process.env safely. Existing system environment variables take precedence.

### Access enviornment variables safely

```javascript
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
```
* `getEnv` throws an error immediately if the key was not loaded via init().
* Ensures no silent runtime errors from missing keys.
* `getEnv` will parse booleans or numbers



