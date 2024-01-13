import ShoppingList from "./components/ShoppingList";
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className="flex justify-center items-center">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <ShoppingList />
    </div>
  );
}

export default App;
