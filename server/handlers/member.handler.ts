import { Request, Response } from 'express'
import MemberController from '@controllers/member.controller'

class MemberHandler {

  private controller = new MemberController()

  getAllMembers = async (req: Request, res: Response) => {
    this.controller.getAllMembers(req, res)
  }
  addMember = async (req: Request, res: Response) => {
    this.controller.addMember(req, res)
  }
  editMember = async (req: Request, res: Response) => {
    this.controller.editMember(req, res)
  }
  deleteMember = async (req: Request, res: Response) => {
    this.controller.deleteMember(req, res)
  }
  getMemberAvailableUploadedFile = async (req: Request, res: Response) => {
    this.controller.getMemberAvailableUploadedFile(req, res)
  }
}

export default MemberHandler
