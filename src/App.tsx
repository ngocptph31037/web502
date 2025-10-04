import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster/>
      <Routes>
  <Route path="/" element={<LayoutClient/>}>
    <Route index element={<Home/>}/>
    <Route path="product" element={<Products/>}/>
    <Route path="news" element={<h1>Tin tức</h1>}/>
    <Route path="about" element={<h1>About</h1>}/>
  </Route>

  <Route path="*" element={<h1>Not found</h1>}/>
</Routes>
    </>
  )
}

export default App
