const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController.js");
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


/**
 * @swagger
 *  /posts:
 *    get:
 *      summary: 팔로잉 중인 유저의 모든 피드 조회
 *      tags:
 *      - posts
 *      description: 현재 로그인 중인 아이디의 팔로우를 모두 확인하여 전체 피드를 반환
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 전체 피드 조회 성공
 *        content:
 *          application/json:
 *            schema: 
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      content:
 *                        type: string
 *                        example: 안녕하세요
 *                      updated_at:
 *                          type: date
 *                          example: 2022-11-10 10:29:10
 *                      heart_count:
 *                          type: integer
 *                          example : 15
 *                      User:
 *                        type: object
 *                        properties:
 *                          id: 
 *                            type: integer
 *                            example: 1
 *                          name:
 *                            type: string
 *                            example: 홍길동
 *                          nick:
 *                            type: string
 *                            example: cocoS2
 *                          image:
 *                            type: string
 *                            example: firebase storage url주소
 *                      Hearts:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties: 
 *                              id:
 *                                type: integer
 *                                example: 해당 값이 있을 경우 현재 로그인 유저가 좋아요 한 피드
 *                      PostImages:
 *                         type: array
 *                         items:
 *                            type: object
 *                            properties:
 *                              img_url:
 *                                type: string
 *                                example : firebase storage url 주소
 *                                  
 *       204:
 *        description: 조회는 완료되었으나 결과가 없음(팔로우를 안했거나, 팔로잉한 사람의 게시글이 없음)       
 *       401:
 *        description : 로그인 필요
 *       500:
 *        description : 서버에서 피드 조회 실패
 */
router.get("/",controller.getPosts);

/**
 * @swagger
 *  /posts/{id}:
 *    get:
 *      summary: 피드 하나만 보기
 *      tags:
 *      - posts
 *      description: 피드의 idx값을 query string으로 요청하면 해당하는 피드를 반환
 *      produces:
 *      - application/json
 *      parameters:
 *      - name : id
 *        in : path
 *        description: 해당 피드 idx 값
 *      responses:
 *       200:
 *        description: 해당 피드 조회 성공
 *        content:
 *          application/json:
 *            schema: 
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      example: 1
 *                  content:
 *                      type: string
 *                      example: 안녕하세요
 *                  img:
 *                      type: string
 *                      example : firebase storage url
 *                  updated_at:
 *                      type: date
 *                      example: 2022-11-10 10:29:10
 *                  heart_count:
 *                      type: integer
 *                      example : 15
 *                  User:
 *                    type: object
 *                    properties:
 *                      id: 
 *                        type: integer
 *                        example: 1
 *                      name:
 *                        type: string
 *                        example: 홍길동
 *                      nick:
 *                        type: string
 *                        example: cocoS2
 *                      image:
 *                        type: string
 *                        example: firebase storage url주소
 *                      PostImages:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            img_url:
 *                              type: string
 *                              example : firebase storage url 주소
 *                  
 *       401:
 *        description : 로그인 필요
 *       500:
 *        description : 서버에서 해당 피드 조회 실패
 */
router.get("/:id",controller.getPosts);

/**
 * @swagger
 *  /posts:
 *    post:
 *      summary : 피드 게시
 *      tags:
 *      - posts
 *      description: 피드 내용과 사진을 업로드하고 DB와 Firestore에 각각 저장
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *                type: object
 *                properties:
 *                  content:
 *                    type: string
 *                  files:
 *                    type: array
 *                    format: binary
 *      responses:
 *       201:
 *        description: 피드 게시 성공
 *       400:
 *        description: 파일이 첨부되지 않음
 *       500:
 *        description: 서버 내부 에러 ( db 연결 등 )
 */
router.post("/", upload.array('files',6), controller.postPosts);

/**
 * @swagger
 *  /like/:id:
 *    put:
 *     summary: 좋아요 추가 및 제거
 *     tags:
 *       - posts
 *     description: 현재 로그인 된 유저가 좋아요 누를 시 DB(heart)에 해당 유저 id값과 피드의 id값이 저장됨
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 해당 피드의 id값
 *     responses:
 *       200:
 *        description: 좋아요 추가 및 제거 완료
 *       400:
 *        description: 요청값이 올바르지 않음
 *  
 */
router.put("/like/:id", controller.putLike);

router.post("/comment", controller.postComment);

router.put("/comment/:commentId",controller.putComment);

router.delete("/comment/:commentId",controller.deleteComment);
module.exports = router, upload;