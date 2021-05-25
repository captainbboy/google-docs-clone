import { useCallback, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { io } from "socket.io-client"
import logo from './doclogo.png'
import { v4 as uuidV4 } from "uuid"

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
      let container = document.getElementsByClassName('driveElementsContainer')[0]
      documents.forEach((doc) => {
        let div = document.createElement('div')
        div.className = 'driveElementBox'
        let image = document.createElement('img')
        image.src = logo;
        image.className = 'driveImageElement'
        div.append(image)
        let title = document.createElement('a')
        title.innerHTML = doc.title || "Untitled Document"
        title.className = "driveTitleElement"
        title.href = '/documents/'+doc._id
        div.append(title)
        container.append(div)
      })
    })

    socket.emit("get-all-documents")
  }, [socket])

  function addDocument() {
    window.location = "/documents/"+uuidV4()
  }

  return (
    <div className="driveElementsContainer">
      <div className="addDocumentContainer">
        <button className="addDocumentButton" onClick={addDocument}>+</button>
      </div>
    </div>
  )
  
}