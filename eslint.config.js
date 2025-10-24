import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: {
      js,
    },
    extends: [js.configs.recommended], // Extending recommended JavaScript rules
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
]);