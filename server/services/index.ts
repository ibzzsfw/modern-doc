import { PrismaClient } from '@prisma/client'
import Prisma from '@utils/prisma'
import { z } from 'zod'

export interface IService { }

class BaseService implements IService {
    _prisma: PrismaClient = Prisma
    _z: typeof z = z
}

export default BaseService