import React, { useState } from 'react';
import {
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Alert,
  Box,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FileUploader = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [documentInputKey, setDocumentInputKey] = useState(Date.now());
  const [imagesInputKey, setImagesInputKey] = useState(Date.now());
  const [videoInputKey, setVideoInputKey] = useState(Date.now());

  const handleFileChange = (event, category) => {
    const files = Array.from(event.target.files);
    if (category === 'documents') {
      setSelectedDocument(files[0]);
    } else if (category === 'images') {
      setSelectedImages(files);
    } else if (category === 'videos') {
      setSelectedVideo(files[0]);
    }
    setErrorMessage('');
  };

  const handleRemoveFile = (category, index) => {
    if (category === 'documents') {
      setSelectedDocument(null);
      setDocumentInputKey(Date.now()); 
    } else if (category === 'images') {
      setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setImagesInputKey(Date.now()); 
    } else if (category === 'videos') {
      setSelectedVideo(null);
      setVideoInputKey(Date.now()); 
    }
  };

  const uploadFiles = (files, category) => {
    files.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);

      fetch(`http://localhost:3000/uploads/${category}`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => console.log('Success:', data))
        .catch((error) => {
          console.error('Error:', error);
          alert('Upload failed. Please check console for details.');
        });
    });
  };

  const handleUpload = (category) => {
    if (category === 'documents' && selectedDocument) {
      uploadFiles([selectedDocument], category);
    } else if (category === 'images') {
      if (selectedImages.length >= 2) {
        uploadFiles(selectedImages, category);
      } else {
        setErrorMessage('Please select at least 2 images to upload.');
      }
    } else if (category === 'videos' && selectedVideo) {
      uploadFiles([selectedVideo], category);
    } else {
      setErrorMessage('Please select a file to upload.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Upload Your Files
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Documents
              </Typography>
              <input
                key={documentInputKey}
                type="file"
                accept=".doc,.docx,.pdf"
                onChange={(e) => handleFileChange(e, 'documents')}
                style={{ display: 'block', marginBottom: '10px' }}
              />
              {selectedDocument && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {selectedDocument.name}
                  </Typography>
                  <IconButton onClick={() => handleRemoveFile('documents')}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpload('documents')}
                disabled={!selectedDocument}
              >
                Upload Document
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Pictures
              </Typography>
              <input
                key={imagesInputKey}
                type="file"
                multiple
                accept=".jpg,.jpeg,.gif,.png"
                onChange={(e) => handleFileChange(e, 'images')}
                style={{ display: 'block', marginBottom: '10px' }}
              />
              {selectedImages.length > 0 && (
                <Box sx={{ marginBottom: 2 }}>
                  {selectedImages.map((file, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                      <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {file.name}
                      </Typography>
                      <IconButton onClick={() => handleRemoveFile('images', index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpload('images')}
                disabled={selectedImages.length < 2}
              >
                Upload Images
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Video
              </Typography>
              <input
                key={videoInputKey}
                type="file"
                accept=".mp4,.wmv"
                onChange={(e) => handleFileChange(e, 'videos')}
                style={{ display: 'block', marginBottom: '10px' }}
              />
              {selectedVideo && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {selectedVideo.name}
                  </Typography>
                  <IconButton onClick={() => handleRemoveFile('videos')}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpload('videos')}
                disabled={!selectedVideo}
              >
                Upload Video
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FileUploader;
