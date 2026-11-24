import { createContext, useContext, useRef, useState } from 'react'

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)
  const timeoutRef = useRef(null)

  const notify = (message, seconds = 5) => {
    clearTimeout(timeoutRef.current)
    setNotification(message)
    timeoutRef.current = setTimeout(() => {
      setNotification(null)
    }, seconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext).notification
export const useNotify = () => useContext(NotificationContext).notify

export default NotificationContext