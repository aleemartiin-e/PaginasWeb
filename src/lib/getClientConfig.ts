import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { ClientConfig, ClientContent, ClientTheme } from "./types";

const CLIENTS_DIR = path.join(process.cwd(), "clients");
const DEFAULT_CLIENT_ID = "_template";

function readJson<T>(clientId: string, file: "theme.json" | "content.json"): T {
  const filePath = path.join(CLIENTS_DIR, clientId, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

/**
 * Resolves which client's landing page to build. Selected at build/start
 * time via CLIENT_ID so each client gets its own deployment from the same
 * codebase (see clients/_template and CLAUDE.md).
 */
export function getClientConfig(): ClientConfig {
  const clientId = process.env.CLIENT_ID?.trim() || DEFAULT_CLIENT_ID;
  const clientDir = path.join(CLIENTS_DIR, clientId);

  if (!fs.existsSync(clientDir)) {
    throw new Error(
      `CLIENT_ID="${clientId}" no existe en /clients. Crea /clients/${clientId}/theme.json y content.json, o revisa el valor de CLIENT_ID.`
    );
  }

  const theme = readJson<ClientTheme>(clientId, "theme.json");
  const content = readJson<ClientContent>(clientId, "content.json");

  return { theme, content };
}
