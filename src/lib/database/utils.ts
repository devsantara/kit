import fs from 'node:fs';
import path from 'node:path';

/**
 * Resolves the path to the local D1 SQLite database file created by Miniflare.
 * It looks for the most recently modified .sqlite file in the Miniflare D1 directory.
 * This allows Drizzle to connect to the correct local database instance during development.
 */
export function getLocalCloudflareD1Path() {
  try {
    const miniflareD1Path = path.resolve('.alchemy/miniflare/v3/d1');

    const files = fs
      .readdirSync(miniflareD1Path, { encoding: 'utf-8', recursive: true })
      .filter((fileName) => fileName.endsWith('.sqlite'));

    if (!files.length) {
      throw new Error(`No .sqlite file found at ${miniflareD1Path}`);
    }

    // Retrieve most recent .sqlite file
    files.sort((a, b) => {
      const statA = fs.statSync(path.join(miniflareD1Path, a));
      const statB = fs.statSync(path.join(miniflareD1Path, b));

      return statB.mtime.getTime() - statA.mtime.getTime();
    });

    return path.resolve(miniflareD1Path, files[0] ?? '');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error resolving local D1 DB: ${error.message}`, {
        cause: error,
      });
    }

    throw new Error('Error resolving local D1 DB', { cause: error });
  }
}
