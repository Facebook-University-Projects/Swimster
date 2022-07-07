import * as React from 'react'
import { style } from './style'

const App = () => {
  return (
    <div className={style.container}>
      <button className={style.button}>Login</button>
      <button className={style.button}>Logout</button>
    </div>
  )
}

export default App
