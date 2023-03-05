import Onboarding from "./components/Onboarding";
import useStore from "./store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Table from "./components/Table";
import Combinations from "./components/Combinations";
import ImageViewer from "./components/ImageViewer";

const queryClient = new QueryClient();

function App() {
  const { apiKey } = useStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Onboarding open={!apiKey} />
      <ImageViewer />
      <div className="container mx-auto p-4">
        <h1 className="py-8 text-3xl text-white font-mono">Morphological Box - AI Art</h1>
        <h1 className="py-8 text-2xl text-white font-mono">Configuration</h1>

        <Table />
        <h1 className="py-8 text-2xl text-white font-mono">Combinations</h1>

        <Combinations />
      </div>
    </QueryClientProvider>
  )
}

export default App
