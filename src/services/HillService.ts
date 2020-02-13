import Repository, { IRepository } from '@/database/Repository'
import Hill from '@/schema/Hill'
import Rules from '@/schema/HillRules'
import UuidFactory, { IUuidFactory } from '@/services/UuidFactory'
import { HILL_COLLECTION } from '@/constants'

export interface IHillService {
    getById(id: string): Promise<Hill>
    getAll(): Promise<Hill[]>
    createHill(rules: Rules): Promise<Hill>
    deleteHill(id: string): Promise<string>
    challengeHill(hillId: string, warriorId: string): Promise<string>
}

export default class HillService implements IHillService {
    private repo: IRepository
    private uuid: IUuidFactory

    constructor(repo: IRepository, uuid: IUuidFactory) {
        this.repo = repo
        this.uuid = uuid
    }

    public async getById(id: string): Promise<Hill> {
        return this.repo.getById<Hill>(id)
    }

    public async getAll(): Promise<Hill[]> {
        return this.repo.getAll<Hill>()
    }

    public async createHill(rules: Rules): Promise<Hill> {
        const result = {
            id: this.uuid.get(),
            rules,
            warriors: []
        }

        await this.repo.upsert(result)

        return result
    }

    public async deleteHill(id: string): Promise<string> {
        await this.repo.delete(id)

        return id
    }

    public async challengeHill(_: string, __: string): Promise<string> {
        throw new Error('Not implemented')
    }
}

export const buildHillService: () => IHillService = () =>
    new HillService(new Repository(HILL_COLLECTION), new UuidFactory())
