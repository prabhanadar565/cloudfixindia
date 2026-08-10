import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
    build: {
        rolldownOptions: {
            input: {
                main: resolve(process.cwd(), "index.html"),
                login: resolve(process.cwd(), "login.html"),
                admin: resolve(process.cwd(), "admin.html")
            }
        }
    }
});