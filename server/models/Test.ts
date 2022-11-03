import { Request, Response } from 'express'

class Test {
  static test = async (req: Request, res: Response) => {
    res.json({ message: 'test' })
  }
}

export default Test
