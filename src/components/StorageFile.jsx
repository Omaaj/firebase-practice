import { ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from '../config/FirebaseConfig';

export default function StorageFile() {
    const [fileUpload, setFileUpload] = useState(null);

    const handleUpload = async () => {
        if(!fileUpload) {
            return;
        }
        const fileStorageRef = ref(storage, `projectFile/${fileUpload.name}`)
        try {
            await uploadBytes(fileStorageRef, fileUpload)
            
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <input 
            type="file" 
            onChange={(e) => setFileUpload(e.target.files[0])}
        />
        <button onClick={handleUpload}>Upload File</button>
    </div>
  )
}
