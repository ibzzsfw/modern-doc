import { Request, Response } from 'express'
import User from '../models/User'
class UserController {
  addUser = async (req: Request, res: Response) => {
    User.addUser(req, res)
  }
  checkCitizenIdStatus = async (req: Request, res: Response) => {
    User.checkCitizenIdStatus(req, res)
  }
}

export default new UserController()