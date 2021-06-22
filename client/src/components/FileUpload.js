import React, { useState } from 'react';
//react hook 'react-zoom-pan-pinch' helps in zooming in and out of images
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
//http client axios for uploading input file
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [error, setError] = useState('');

  //setting allowed file types
  const allowed = ['image/jpeg', 'image/png'];
  
  const onChange = e => {
    let selected = e.target.files[0];

    //if a file is selected and it is of specified type
    if(selected && allowed.includes(selected.type)){
      setFile(selected);
      setFilename(selected.name);
    }
    //showing an alert on choosing wrong type of file
    else{
      setFile('');
      setError("Please select an image (png or jpeg)");
    }
  };

  //uploading the file
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    //sending an upload request
    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setFilename('Choose File');
    } 
    //handling exceptions
    catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <>
      {/* upload form */}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <div className="output">
            { error && <p className="text-danger">{error}</p>}
          </div>
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>
        <input
          type='submit'
          value='Upload'
          className='btn btn-success btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <p className='text-center'>{uploadedFile.fileName}</p>
            <br/>
            {/* wrapping image in react-zoom-pan-pinch tags to enable zooming */}
            <TransformWrapper>
              <TransformComponent>
                <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
              </TransformComponent>
            </TransformWrapper>
            <br/>
            <h4 className="text-center">Use the mouse wheel to zoom in and out</h4>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FileUpload;