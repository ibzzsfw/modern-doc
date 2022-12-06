import { Request, Response } from 'express'
import Member from '@models/Member'
class MemberController {
  getAllMembers = async (req: Request, res: Response) => {
    Member.getAllMembers(req, res)
  }
  addMember = async (req: Request, res: Response) => {
    Member.addMember(req, res)
  }
  editMember = async (req: Request, res: Response) => {
    Member.editMember(req, res)
  }
  deleteMember = async (req: Request, res: Response) => {
    Member.deleteMember(req, res)
  }
}

export default new MemberController()
