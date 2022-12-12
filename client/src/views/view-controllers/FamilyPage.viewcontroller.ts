import { useState } from "react";
import shallow from "zustand/shallow";
import UserType from "src/view-models/UserType";
import { useLoginDataStore } from "@models/LoginDataStore.model";

class FamilyPageViewController {

  lockEditState: [boolean, (lockEdit: boolean) => void] = useState(false)
  addMemberState: [boolean, (addMember: boolean) => void] = useState(false)
  familyMembers: UserType[] = useLoginDataStore(
    (state) => state.familyMembers,
    shallow
  )

  constructor() {
    this.lockEditState = useState(false)
    this.addMemberState = useState(false)
  }

  lockId = (id: string | null) => this.lockEditState[1](id !== null)
}

export default FamilyPageViewController