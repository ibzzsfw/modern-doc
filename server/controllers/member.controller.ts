import { Request, Response } from 'express';
import MemberService from '@services/member.service';

class MemberController {

  private service = new MemberService();

  getAllMembers = async (req: Request, res: Response) => {

    const householdId = req.headers['household-id'] as string
    const userId = req.headers['user-id'] as string

    const response = await this.service.getAllMembers(householdId, userId)
    res.status(response.status).json(response.json)
  }

  addMember = async (req: Request, res: Response) => {

    const { householdId, title, firstName, lastName, citizenId, relationship } =
      req.body

    const response = await this.service.addMember(householdId, title, firstName, lastName, citizenId, relationship)
    res.status(response.status).json(response.json)
  }

  editMember = async (req: Request, res: Response) => {

    const { id } = req.params
    const body = req.body

    const response = await this.service.editMember(id, body)
    res.status(response.status).json(response.json)
  }

  deleteMember = async (req: Request, res: Response) => {

    const { id } = req.params

    const response = await this.service.deleteMember(id)
    res.status(response.status).json(response.json)
  }

  getMemberAvailableUploadedFile = async (req: Request, res: Response) => {

    const { fileId } = req.params
    const userId = req.headers['user-id'] as string

    const response = await this.service.getMemberAvailableUploadedFile(fileId, userId)
    res.status(response.status).json(response.json)
  }
}

export default MemberController