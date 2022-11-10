import Note from '@models/Note';

class NoteController {

  private notes: Note[] = [];

  static getNotes = (type: string) : Note[] => {
    return [new Note("1", "title", "content", new Date())];
  }
}

export default NoteController;