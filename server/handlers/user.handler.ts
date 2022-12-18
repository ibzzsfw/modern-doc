import { Request, Response } from 'express'
import UserController from '@controllers/user.controller'

class UserHandler {

  private controller = new UserController()

  addUser = async (req: Request, res: Response) => {
    this.controller.addUser(req, res)
  }

  checkCitizenIdStatus = async (req: Request, res: Response) => {
    this.controller.checkCitizenIdStatus(req, res)
  }

  checkPhonePassword = async (req: Request, res: Response) => {
    this.controller.checkPhonePassword(req, res)
  }

  login = async (req: Request, res: Response) => {
    this.controller.login(req, res)
  }

  getFolders = async (req: Request, res: Response) => {
    this.controller.getFolders(req, res)
  }
  
  getFiles = async (req: Request, res: Response) => {
    this.controller.getFiles(req, res)
  }

  switchMember = async (req: Request, res: Response) => {
    this.controller.switchMember(req, res)
  }

  editProfile = async (req: Request, res: Response) => {
    this.controller.editProfile(req, res)
  }

  changePassword = async (req: Request, res: Response) => {
    this.controller.changePassword(req, res)
  }

  checkPhoneStatus = async (req: Request, res: Response) => {
    this.controller.checkPhoneStatus(req, res)
  }

}

export default UserController
