import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'

const queryClient = new QueryClient()
//This creates the QueryClient, so this a class as we get back an object with
//Tooling/functions and properties we will use.

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)

/* 
Additionally:
It seems QueryClientProvider is our import - now supposedly this is an object with functionality, 
but we pass as a prop the instance of the instantiated queryClient?
This is supposedly an object, which then points to our external state DB. 

QueryClientProvider is a component - there is no DB; 
it is capitalized and used as JSX - it's a component. 
Its job is to take the one queryClient instance through the client prop and make it 
reachable by every useQuery and useMutation below it. 

The cache itself is a plain object in the browser's memory, inside queryClient. Refresh the page and it's gone, then refilled by fetching. The database is still json-server on the other end; the client only holds copies of what it returned.

queryClient is created outside any component so that it's built once. Inside App, it would be rebuilt on every render and the cache would be emptied each time.

*/