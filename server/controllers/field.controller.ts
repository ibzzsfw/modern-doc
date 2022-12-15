import { Request, Response } from 'express'
import FieldService from "../services/field.service";

class FieldController {

  private service = new FieldService();

    
  getAllField = async (req: Request, res: Response) => {
    try  {
      const fields = await this.service.getAllField(req, res);
      return res.status(200).json(fields);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
}