import './App.css'
import Homepage from "./pages/homepage.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Exercise1 from "./pages/exercise1.tsx";
import Exercise2 from "./pages/exercise2.tsx";
import Exercise3 from "./pages/exercise3.tsx";
import Exercise4 from "./pages/exercise4.tsx";
import Exercise5 from "./pages/exercise5.tsx";
import Exercise6 from "./pages/exercise6.tsx";
import Exercise7 from "./pages/exercise7.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Exercise8 from "./pages/exercise8.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage/>
    },
    {
        path: "/exercise1",
        element: <Exercise1/>
    },
    {
        path: "/exercise2",
        element: <Exercise2/>
    },
    {
        path: "/exercise3",
        element: <Exercise3/>
    },
    {
        path: "/exercise4",
        element: <Exercise4/>
    },
    {
        path: "/exercise5",
        element: <Exercise5/>
    },
    {
        path: "/exercise6",
        element: <Exercise6/>
    },
    {
        path: "/exercise7",
        element: <Exercise7/>
    },
    {
        path: "/exercise8",
        element: <Exercise8/>
    },
]);

// Create a client
const queryClient = new QueryClient()

function App() {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </>
    )
}

export default App
