import { Request, Response } from 'express'
import Test from '../models/Test'
class TestController {
  test = async (req: Request, res: Response) => {
    Test.test(req, res)
  }
}

export default new TestController()
