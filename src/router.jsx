import { createBrowserRouter } from "react-router-dom";
import About from "./components/homePageComponents/About";
import FAQ from "./components/homePageComponents/FAQ";
import Gallery from "./components/homePageComponents/Gallery";
import OurBox from "./components/homePageComponents/OurBox";
import Recommend from "./components/homePageComponents/Recommend";
import ContactUs from "./pages/ContactUs";
import Packages from "./pages/Packages";
import Products from "./pages/Products";
import Store from "./pages/Store";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";


const router = createBrowserRouter([
    {element: <Layout/>, children:[
        {path: "/", element: <HomePage/>},
        {path: "/about", element: <About/>},
        {path: "/ourBox", element: <OurBox/>},
        {path: "/recommend", element: <Recommend/>},
        {path: "/faq", element: <FAQ/>},
        {path: "/gallery", element: <Gallery/>},
        {path: "/store", 
            children:[ 
                { 
                    index: true, 
                    element: <Store/>
                },
                { 
                    path: "products", children:[ 
                        { 
                            index: true, 
                            element: <Products/>
                        },
                        { 
                            path: ":name", 
                            element: <Products/>
                        },
                    ]
                },
                { 
                    path: "packages", children:[ 
                        { 
                            index: true, 
                            element: <Packages/>
                        },
                        { 
                            path: ":name", 
                            element: <Packages/>
                        },
                    ]
                }
            ]},
        {path: "/contactUs", element: <ContactUs/>},
        {path: "*", element: <NotFound/>},
    ]}
]);

export default router 