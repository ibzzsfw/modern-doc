import { useState } from "react";
import shallow from "zustand/shallow";
import UserModel from "../../models/User.model";
import UserViewModel from "../../view-models/User.viewmodel";

class FamilyPageViewController {

  lockEditState: [boolean, (lockEdit: boolean) => void] = useState(false)
  addMemberState: [boolean, (addMember: boolean) => void] = useState(false)
  family: UserViewModel[] = UserModel(
    (state) => state.family,
    shallow
  )

  constructor() {
    this.lockEditState = useState(false)
    this.addMemberState = useState(false)
  }

  lockId = (id: string | null) => this.lockEditState[1](id !== null)
}

export default FamilyPageViewController