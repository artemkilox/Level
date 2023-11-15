import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import './styles/mainPage.css'
import './styles/main.css'
import './styles/gallery.css'
import './styles/apartments.css'


const App = observer(() => {
  return (
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
  );
})

export default App;