interface IFieldController {
    createField(req: Request, res: Response): Promise<void>
    getAllField(req: Request, res: Response): Promise<void>
    createFieldMany(req: Request, res: Response): Promise<void>
    editFieldOfficialName(req: Request, res: Response): Promise<void>
    addChoice(req: Request, res: Response): Promise<void>
    deleteChoice(req: Request, res: Response): Promise<void>
    testConsoleLog(): void
}

export default IFieldController