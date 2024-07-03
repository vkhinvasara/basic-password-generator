import { useState , useCallback, useEffect, useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(0)
  const [numberAvailable, setNumberAvailable] = useState(false)
  const [charAvailable, setCharAvailable] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  let pwd = ''

  const generatePassword =  useCallback(()=> {
    
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (numberAvailable) {
      chars += '0123456789'
    }
    if(charAvailable) {
      chars += '!@#$%^&*()'
    }

    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(pwd)

  }, [length, numberAvailable, charAvailable, setPassword])

  const copyToClipboard = () => {
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAvailable, charAvailable])


  return (
    <div>
      <div>
        <label>Password Generator</label>
      </div>
      <div>
        <label>Length: {length}</label>
        <input type="range" name="length" id="" min={0} max={100} onChange={(e)=>setLength(e.target.value)} value={length}/>
      </div>
      <div>
        <input type="text" readOnly={true} value={password} ref={passwordRef}/>
        <button onClick={()=>copyToClipboard()}>
          Copy
        </button>
      </div>
      <div>
        <label>Numbers</label>
        <input type="checkbox" value={numberAvailable} onChange={(e) => setNumberAvailable(e.target.checked)} />
      </div>
      <div>
        <label>Special Characters</label>
        <input type="checkbox" value={charAvailable} onChange={(e) => setCharAvailable(e.target.checked)} />
      </div>
    </div>
  )
}

export default App
