import { useCallback, useEffect, useState } from "react"
import { io } from "socket.io-client"

export default function TextEditor() {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const s = io("http://localhost:3001")
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null) return

    socket.once("load-all-documents", documents => {
      console.log()
      let container = document.getElementsByClassName('driveElementsContainer')[0]
      documents.forEach((doc) => {
        console.log(doc)
        let div = document.createElement('div')
        div.className = 'driveElementBox'
        div.innerHTML = doc.title
        container.append(div)
      })
    })

    socket.emit("get-all-documents")
  }, [socket])

  return <div className="driveElementsContainer"></div>
}