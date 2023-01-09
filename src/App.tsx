import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Demo from './Demo'
import Player from './Player'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Player />
    </div>
  )
}

export default App


// import React, { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import './App.css'
// import Player from './comonents/Player'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <Routes>
//         <Route path="/" element={<div className='container'><Player  /></div>}/>
//       </Routes>
//   )
// }

// export default App
