import { Fragment } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { publicRoutes, privateRoutes } from "./routes"
// import { DefaultLayout } from "./components/layoutAdmin"
import { DefaultLayout } from "./components/layout"
import { Provider } from "react-redux"


function App() {
  return (
    <Router>

      <Routes>
        {/* {privateRoutes.map((route, index) => {
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout
          } else if (route.layout === null) {
            Layout = Fragment
          }
          const Page = route.component
          return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
        })} */}
        
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            const Page = route.component
            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
          })}
        
      </Routes>
    </Router>
  )
}

export default App
