import {Home} from './components/routes/home/home.component';
import {Navigation} from './components/navigation/navigation.component';
import { Routes, Route } from 'react-router-dom';

export default function App () {
  return(
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

