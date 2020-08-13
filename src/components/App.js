import React from 'react';
import '../styles/App.css';
import Content from './Content'
import TopBar from './TopBar'
import SideBar from './SideBar'

function App() {
  return (
    <div className="App">
      <TopBar />
      <SideBar />
      <Content />
    </div>
  );
}

export default App;
