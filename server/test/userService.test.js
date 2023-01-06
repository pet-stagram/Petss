const admin = require("../services/adminService");
const auth = require("../services/authService");
const posts = require("../services/postsService");

describe('userSer')
test('메시지 가져오기', () => {
    const postDto = {
        user: 1, // 현재 로그인 중인 유저의 idx
        content: "하이요",
        fileUrl: [
            "https://storage.googleapis.com/download/storage/v1/b/petss-b5d7b.appspot.com/o/%2Fuploads%2Ffeed%2F3%2F1.jpeg?generation=1669535111869589&alt=media",
    "https://storage.googleapis.com/download/storage/v1/b/petss-b5d7b.appspot.com/o/%2Fuploads%2Ffeed%2F3%2F1.jpeg?generation=1669535111869589&alt=media"
        ],
    };
    
    return posts.insertPosts(postDto);
});