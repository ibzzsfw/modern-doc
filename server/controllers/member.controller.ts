import IMemberService from '@contracts/services/member.service';
import { Request, Response } from 'express';
import BaseController from '.';

class MemberController extends BaseController {

  private _service: IMemberService

  getAllMembers = async (req: Request, res: Response) => {

    const householdId = req.headers['household-id'] as string
    const userId = req.headers['user-id'] as string

    const response = await this._service.getAllMembers(householdId, userId)
    res.status(response.status).json(response.json)
  }

  addMember = async (req: Request, res: Response) => {

    const { householdId, title, firstName, lastName, citizenId, relationship } =
      req.body

    const response = await this._service.addMember(householdId, title, firstName, lastName, citizenId, relationship)
    res.status(response.status).json(response.json)
  }

  editMember = async (req: Request, res: Response) => {

    const { id } = req.params
    const body = req.body

    const response = await this._service.editMember(id, body)
    res.status(response.status).json(response.json)
  }

  deleteMember = async (req: Request, res: Response) => {

    const { id } = req.params

    const response = await this._service.deleteMember(id)
    res.status(response.status).json(response.json)
  }

  getMemberAvailableUploadedFile = async (req: Request, res: Response) => {

    const { fileId } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this._service.getMemberAvailableUploadedFile(fileId, userId)
    res.status(response.status).json(response.json)
  }
}

export default MemberController