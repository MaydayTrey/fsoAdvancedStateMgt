import { create } from 'zustand'

const useNotificationStore = create((set, get) => ({
  notification: null,
  timeoutId: null,
  actions: {
    setNotification: (message, seconds = 5) => {
      const existing = get().timeoutId
      if (existing) {
        clearTimeout(existing)
      }
      const id = setTimeout(() => {
        set({ notification: null, timeoutId: null })
      }, seconds * 1000)
      set({ notification: message, timeoutId: id })
    }
  }
}))

export const useNotification = () => useNotificationStore(state => state.notification)
export const useNotificationActions = () => useNotificationStore(state => state.actions)
export const notify = (message, seconds = 5) =>
  useNotificationStore.getState().actions.setNotification(message, seconds)

/*
Evaluate the code;
So we import create from Zustand, allowing us to create the store; we utilize the params set and get,
we begin by setting notification to null, timeoutId: null, and then establishing the actions.
setNotification, takes the param message; but passes a default of seconds to 5. 
So this is a bit strange; existing is get() --> so checking the state of timeoutId, 
if it is truthy, they clearTimeout --> But clearTimeout is not a function defined? where does that come from?

Then id is equal to set timeout 

What is getState()?

*/