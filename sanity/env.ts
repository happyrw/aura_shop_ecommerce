export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-09-19';

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET, // Use this for server-side
  'Missing environment variable: SANITY_STUDIO_DATASET'
);

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID, // Use this for server-side
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID'
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
