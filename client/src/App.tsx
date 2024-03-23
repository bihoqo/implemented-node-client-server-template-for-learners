import './App.css'
import HomePage from "./pages/homePage.tsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ExerciseCounterPage from "./pages/exerciseCounterPage.tsx";
import ExerciseInputTextPage from "./pages/exerciseInputTextPage.tsx";
import ExerciseStudentStatisticsPage from "./pages/exerciseStudentStatisticsPage.tsx";
import ExerciseKeyValuePage from "./pages/exerciseKeyValuePage.tsx";
import ExerciseMemoryGamePage from "./pages/exerciseMemoryGamePage.tsx";
import ExerciseRegisterPage from "./pages/exerciseRegisterPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ExerciseLoginPage from "./pages/exerciseLoginPage.tsx";
import ExerciseTodoListPage from "./pages/exerciseTodoListPage.tsx";
import ExerciseButtonColorPage from "./pages/exerciseButtonColorPage.tsx";
import ExerciseOptionsPage from "./pages/exerciseOptionsPage.tsx";
import ExerciseTicTacToePage from "./pages/exerciseTicTacToePage.tsx";
import ExerciseOrderPage from "./pages/exerciseOrderPage.tsx";
import ExerciseLayoutPage from "./pages/exerciseLayoutPage.tsx";
import ExerciseIncludePage from "./pages/exerciseIncludePage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/exerciseCounterPage",
        element: <ExerciseCounterPage/>
    },
    {
        path: "/exerciseIncludePage",
        element: <ExerciseIncludePage/>
    },
    {
        path: "/exerciseButtonColorPage",
        element: <ExerciseButtonColorPage/>
    },
    {
        path: "/exerciseLayoutPage",
        element: <ExerciseLayoutPage/>
    },
    {
        path: "/exerciseOptionsPage",
        element: <ExerciseOptionsPage/>
    },
    {
        path: "/exerciseInputTextPage",
        element: <ExerciseInputTextPage/>
    },
    {
        path: "/exerciseTodoListPage",
        element: <ExerciseTodoListPage/>
    },
    {
        path: "/exerciseStudentStatisticsPage",
        element: <ExerciseStudentStatisticsPage/>
    },
    {
        path: "/exerciseKeyValuePage",
        element: <ExerciseKeyValuePage/>
    },
    {
        path: "/exerciseMemoryGamePage",
        element: <ExerciseMemoryGamePage/>
    },
    {
        path: "/exerciseOrderPage",
        element: <ExerciseOrderPage/>
    },
    {
        path: "/exerciseRegisterPage",
        element: <ExerciseRegisterPage/>
    },
    {
        path: "/exerciseLoginPage",
        element: <ExerciseLoginPage/>
    },
    {
        path: "/exerciseTicTacToePage",
        element: <ExerciseTicTacToePage/>
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
