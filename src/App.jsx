import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import BuyerInput from './pages/BuyerInput'
import Buyer from './pages/Buyer'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import About from './pages/About'
import Contact from './pages/Contact'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="buyer" element={<Buyer />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="buyerinput" element={<BuyerInput />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
      </Route>
    </Routes>
  )
}

export default App
