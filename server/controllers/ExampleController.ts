import { Request, Response } from 'express'
import Example from '../models/Example'
class ExampleController
{
  myFunction1 = (req: Request, res: Response) =>
  {
    res.send(Example.function1())
    console.log(Example.function1())
  }
  
  myFunction2 = (req: Request, res: Response) =>
  {
    res.send(Example.function2())
    console.log(Example.function2())
  }
}

export default new ExampleController()