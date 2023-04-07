import React ,{useState} from 'react';
import Navbartwo from './navbartwo';
import Sidebar from './sidebar';
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <div className="bg-white shadow-sm z-10">
        <Navbartwo onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      </div>
        {/* <Navbar /> */}
      <div className="grid md:grid-cols-sidebar">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        {children}
        <footer>
        <p>This is a footer</p>
      </footer> 
      </div>
    </div>
    </>
  );
};

export default Layout;




