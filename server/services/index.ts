import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

export interface IService { }

class BaseService implements IService {
    _prisma: PrismaClient
    _z: typeof z

    constructor() {
        this._prisma = new PrismaClient()
        this._z = z
    }
}

export default BaseService