import { Request, Response } from 'express'
import User from '@models/User'
class UserController {
  addUser = async (req: Request, res: Response) => {
    User.addUser(req, res)
  }
  checkCitizenIdStatus = async (req: Request, res: Response) => {
    User.checkCitizenIdStatus(req, res)
  }
  checkPhonePassword = async (req: Request, res: Response) => {
    User.checkPhonePassword(req, res)
  }
  login = async (req: Request, res: Response) => {
    User.login(req, res)
  }
  getFolders = async (req: Request, res: Response) => {
    User.getFolders(req, res)
  }
  getFiles = async (req: Request, res: Response) => {
    User.getFiles(req, res)
  }
  switchMember = async (req: Request, res: Response) => {
    User.switchMember(req, res)
  }
}

export default new UserController()