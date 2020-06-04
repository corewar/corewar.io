import Repository from './Repository'

export const buildRepository = (collectionName: string): Repository => new Repository(collectionName)
