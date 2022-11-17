const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("../config/petss-b5d7b-firebase-adminsdk-8rolr-eeb3aba037.js");
const fs = require("fs");
const path = require("path");
const e = require("express");

// firebase Admin 초기화
const admin = firebaseAdmin.initializeApp(
    {
        credential: firebaseAdmin.credential.cert(serviceAccount),
    },
    "storage"
);

const storageRef = admin.storage().bucket(`gs://petss-b5d7b.appspot.com`);

async function uploadProfileImage(userDto) {
    const {id, file, isBasic } = userDto;
    console.log(id)
    const desertFile = storageRef.file(`uploads/users/${id}/profile.jpeg`);
    try {
        if(Object.keys(desertFile.metadata).length!==0)
            await desertFile.delete();
    } catch (err) {
        throw err;
    }
    const storage = await storageRef.upload(file, {
        public: true,
        destination: `/uploads/users/${id}/profile.jpeg`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        },
    });
    
    const imgUrl = storage[0].metadata.mediaLink;

    if(!isBasic){
        fs.rmSync(file, { recursive: true, force: true });
    }
    
    return imgUrl;
}

async function uploadPostsImages(newPostNum, files) {
    const urlArr = [];
    let storage;
    const promises = files.map(async (file, index) => {
        const ext = path.extname(file.originalname);
        storage = await storageRef.upload(file.path, {
            public: true,
            destination: `/uploads/feed/${newPostNum}/${index}${ext}`,
            metadata: {
                firebaseStorageDownloadTokens: uuidv4(),
            },
        });
        urlArr.push(storage[0].metadata.mediaLink);
        fs.rmSync(file.path, { recursive: true, force: true });
    });
    await Promise.all(promises);
    return urlArr;
}

module.exports = { uploadProfileImage, uploadPostsImages };
