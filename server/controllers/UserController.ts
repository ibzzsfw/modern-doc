import { Request, Response } from 'express'
import User from '../models/User'
class UserController {
  addUser = async (req: Request, res: Response) => {
    User.addUser(req, res)
  }
  checkCitizenIdStatus = async (req: Request, res: Response) => {
    User.checkCitizenIdStatus(req, res)
  }
  test = async (req: Request, res: Response) => {
    User.test(req, res)
  }
  login = async (req: Request, res: Response) => {
    User.login(req, res)
  }
}

export default new UserController()
