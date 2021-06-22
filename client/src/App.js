import React from 'react';
import FileUpload from './components/FileUpload';
import {Footer} from './components/Footer';

const App = () => (
  <div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
      Image Uploader
    </h4>
    <FileUpload />
    <Footer/>
  </div>
);

export default App;
