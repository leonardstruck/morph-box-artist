import Onboarding from "./components/Onboarding";
import useStore from "./store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Table from "./components/Table";
import Combinations from "./components/Combinations";
import ImageViewer from "./components/ImageViewer";

const queryClient = new QueryClient();

function App() {
  const { apiKey, deleteStore } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Onboarding open={!apiKey} />
        <ImageViewer />
        <div className="container mx-auto p-4 flex-grow">
          <h1 className="py-8 text-3xl text-white font-mono">Morphological Box - AI Art</h1>
          <h1 className="py-8 text-2xl text-white font-mono">Configuration</h1>

          <Table />
          <h1 className="py-8 text-2xl text-white font-mono">Combinations</h1>

          <Combinations />
        </div>
        <footer>
          <p className="text-center text-white text-xs p-2">
            FH Technikum Wien - KREKO - SS2023 - Struck, Utz
            <a href="#" className="underline text-gray-400 ml-2" onClick={() => deleteStore()}>delete local data</a>
          </p>
        </footer>
      </div>
    </QueryClientProvider>
  )
}

export default App
