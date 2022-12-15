import { Request, Response } from 'express';
import UserService from '@services/user.service';

class UserController {

  private service = new UserService();

  checkCitizenIdStatus = async (req: Request, res: Response) => {

    const citizenId = req.params.citizenId

    const response = await this.service.checkCitizenIdStatus(citizenId)
    res.status(response.status).json(response.json)
  }

  addUser = async (req: Request, res: Response) => {

    const body = req.body

    const response = await this.service.addUser(body)
    res.status(response.status).json(response.json)
  }

  checkPhonePassword = async (req: Request, res: Response) => {

    const { phoneNumber, password } = req.body

    const response = await this.service.checkPhonePassword(phoneNumber, password)
    res.status(response.status).json(response.json)
  }

  login = async (req: Request, res: Response) => {

    const { phoneNumber } = req.body

    const response = await this.service.login(phoneNumber)
    res.status(response.status).json(response.json)
  }

  getFolders = async (req: Request, res: Response) => {

    let { userId } = req.params

    const response = await this.service.getFolders(userId)
    res.status(response.status).json(response.json)
  }

  getFiles = async (req: Request, res: Response) => {

    let { userId } = req.params

    const response = await this.service.getFiles(userId)
    res.status(response.status).json(response.json)
  }

  switchMember = async (req: Request, res: Response) => {

    const { userId } = req.body

    const response = await this.service.switchMember(userId)
    res.status(response.status).json(response.json)
  }

  editProfile = async (req: Request, res: Response) => {

    const body = req.body
    const userId = req.headers['user-id'] as string

    const response = await this.service.editProfile(userId, body)
    res.status(response.status).json(response.json)
  }

  changePassword = async (req: Request, res: Response) => {

    let { oldPassword, newPassword } = req.body
    const userId = req.headers['user-id'] as string

    const response = await this.service.changePassword(userId, oldPassword, newPassword)
    res.status(response.status).json(response.json)
  }

}

export default UserController