export function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`required environment variable "${name}" was not found`);
  }

  return value;
}