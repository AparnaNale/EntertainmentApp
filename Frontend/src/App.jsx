import { useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import { fetchBookmarks } from '../redux/slice/BookmarkSlice'
import { isLoggedIn } from './utils/auth'

function App() {
  const dispatch = useDispatch()

  // App load होताच (refresh नंतरही) आधीच login असलेल्या user चे bookmarks आणून
  // ठेवतो, जेणेकरून Home/Movies/TV सगळीकडे bookmark icon बरोबर दिसेल
  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(fetchBookmarks())
    }
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
