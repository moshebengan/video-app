import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Video from "./pages/Video";
import Login from "./pages/Login";
import Search from "./pages/Search";

import Profile from "./pages/Profile";
import Help from "./pages/Help";

const Container = styled.div`
  display: flex;
  
 @media only screen and (max-width: 600px) {
  width: 100%;

  overflow-x: hidden;
  
  
  
 }
 
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:100%;
   
    flex: none;
    

    
    
  }
`;

const Wrapper = styled.div`
  padding: 22px 66px;

  @media only screen and (max-width: 600px) {
    display: flex;
    padding: 0;
    width: 100%;
    justify-content: center;
    align-items: center;
    
    
  
   
    
  }

`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  // console.log(process.env.NODE_ENV)
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen)
  //   console.log('Sidebaropen: ', isSidebarOpen)
  // }

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container>
          <BrowserRouter>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
            <Main>
              <Navbar />
              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Homepage type="random" />} />
                    <Route path="trends" element={<Homepage type="trend" />} />
                    <Route
                      path="subscriptions"
                      element={<Homepage type="sub" />}
                    />

                    <Route path="bestof">
                      <Route path="music" element={<Homepage type="music" />} />
                      <Route
                        path="sports"
                        element={<Homepage type="sports" />}
                      />
                      <Route
                        path="gaming"
                        element={<Homepage type="gaming" />}
                      />
                      <Route
                        path="movies"
                        element={<Homepage type="movies" />}
                      />
                      <Route path="live" element={<Homepage type="live" />} />
                    </Route>
                    <Route
                      path="library"
                      element={<Homepage type="library" />}
                    />
                    <Route path="help" element={<Help />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="video">
                      <Route path=":id" element={<Video />} />
                    </Route>
                    <Route path="search" element={<Search />} />
                    <Route path="profile" element={<Profile />} />
                  </Route>
                </Routes>
              </Wrapper>
            </Main>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
