import { Navigate, Route, Routes } from "react-router-dom"

// Import del layout di default
import DefaultLayout from "./layouts/DefaultLayout"
// Import del provider globale
import GlobalProvider from "./contexts/GlobalContext"

// Import delle pagine
import LaptopsPage from "./pages/LaptopsPage"
import DetailLaptopPage from "./pages/DetailLaptopPage"
import FavPage from "./pages/FavPage"
import ComparePage from "./pages/ComparePage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {


  return (
    <GlobalProvider>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<Navigate to='/laptops-list' />} />
          <Route path='/laptops-list' element={<LaptopsPage />} />
          <Route path='/laptops-list/:id' element={<DetailLaptopPage />} />
          <Route path='/favourites' element={<FavPage />} />
          <Route path='/compare-laptops' element={<ComparePage />} />
          {/* Rotta per gestire pagine non trovate */}
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </GlobalProvider>
  )
}

export default App
