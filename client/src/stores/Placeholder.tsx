import create from 'zustand'

type Placeholder = {
  name: string
}

export const usePlaceholderStore = create<Placeholder>((set) => ({
  name: 'Placeholder',
}))
