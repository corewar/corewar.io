import { MongoRepository } from 'mongtype'

export const mockRepository = <T>(): jest.Mocked<MongoRepository<T>> =>
    (({
        findById: jest.fn(),
        find: jest.fn(),
        create: jest.fn(),
        save: jest.fn()
    } as unknown) as jest.Mocked<MongoRepository<T>>)
