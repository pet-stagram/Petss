const multer = require('multer');
const fs = require('fs');
const path = require('path');

try{
    fs.readdirSync("uploads");
}catch(err){
    console.log("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
}

const upload = multer({ // multer의 인수로 설정을 넣음
    storage: multer.diskStorage({ // storage(저장 위치) 속성
        destination(req, file, done){ // 어디?(요청 정보, 업로드한 파일 정보, 함수) -> req, file 데이터를 가공 후 done으로 넘김
            done(null, 'uploads/'); // done(에러가 있으면 에러를 넣음, 실제 경로(or 파일 이름))
        },
        filename(req, file, done){ // 파일 이름
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 이름이 겹치지 않도록 이름에 현재 시간을 저장 
            // 결국, upload라는 폴더에 [파일명+현재시간.확장자]로 업로드
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024}, // 업로드 제한 사항:{파일 크기: 5mb}
});

module.exports = upload;