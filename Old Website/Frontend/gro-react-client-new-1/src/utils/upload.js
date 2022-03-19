import { upload } from 'config/env';

const uploadFile = (file) => {

  return fetch(upload.url,
    {
      method: "POST",
      body: JSON.stringify({
        file: file,
        tags: 'browser_upload',
        upload_preset: upload.preset
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
  );
};

export default uploadFile;