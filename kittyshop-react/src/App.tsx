import HeaderMobile from './components/HeaderMobile';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

export default function App() {
  return (
    <div className="wrapper">
      <HeaderMobile />
      <Sidebar />
      <Main />
    </div>
  );
}
