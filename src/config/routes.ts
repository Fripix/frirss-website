export const pageIds = ['home', 'features', 'getStarted', 'docs'] as const;
export type PageId = (typeof pageIds)[number];
