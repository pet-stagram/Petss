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
 *        description : 세션없음 (로그인 안됨)
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
 *       401:
 *        description: 세션이 없음(로그인 안됨)
 *       500:
 *        description: 서버 내부 에러 ( db 연결 등 )
 */
router.post("/", upload.array('files',6), controller.postPosts);

/**
 * @swagger
 *  /posts/{postId}:
 *    put:
 *      summary: 피드 수정
 *      tags:
 *      - posts
 *      description: 현재 로그인한 유저가 자신의 피드 수정
 *      produces:
 *      - application/json
 *      parameters:
 *      - name : postId
 *        in : path
 *        description: 해당 피드 idx 값
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  content:
 *                      type: string
 *                      description: 수정할 피드 내용
 *      responses:
 *          201: 
 *              description: 피드 수정완료
 *          400:
 *              description: 잘못된 요청값
 *          401:
 *              description: 세션 없음(로그인 안됨)
 *          403: 
 *              description: 현재 사용자의 피드가 아니거나 존재하지 않는 피드
 *          500:
 *              description: DB 서버오류
 * 
 */
router.put("/:postId",controller.putPosts);

/**
 * @swagger
 *  /posts/{postId}:
 *    delete:
 *      summary: 피드 삭제
 *      tags:
 *      - posts
 *      description: 현재 로그인한 유저가 자신의 피드 삭제
 *      produces:
 *      - application/json
 *      parameters:
 *      - name : postId
 *        in : path
 *        description: 해당 피드 idx 값
 *      responses:
 *          204: 
 *              description: 피드 삭제완료
 *          400:
 *              description: 잘못된 요청값
 *          401:
 *              description: 세션이 없음(로그인 안됨)
 *          403: 
 *              description: 현재 사용자의 피드가 아니거나 존재하지 않는 피드
 *          404:
 *              description: url의 commentId 값이 숫자가 아니거나, 해당 comment가 존재하지 않을 때
 *          500:
 *              description: DB 서버오류
 * 
 */
router.delete("/:postId",controller.deletePosts);

/**
 * @swagger
 *  /posts/comment:
 *    post:
 *      summary : 댓글 작성
 *      tags:
 *      - posts
 *      description: 해당 피드에 댓글작성
 *      produces:
 *       - application/json
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *                type: object
 *                properties:
 *                  content:
 *                    type: string
 *                  postId:
 *                    type: integer
 *      responses:
 *       201:
 *        description: 댓글 작성 성공
 *       400:
 *        description: 클라이언트 요청(잘못된 body 값 등) 에러
 *       401:
 *        description: 세션 없음(로그인 안됨)
 */
router.post("/comment", controller.postComment);

/**
 * @swagger
 *  /posts/comment/{commentId}:
 *    put:
 *      summary: 댓글 수정
 *      tags:
 *      - posts
 *      description: 현재 로그인한 유저가 자신의 댓글 수정
 *      produces:
 *      - application/json
 *      parameters:
 *      - name : commentId
 *        in : path
 *        description: 해당 댓글 idx 값
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  content:
 *                      type: string
 *                      description: 수정할 피드 내용
 *      responses:
 *          201: 
 *              description: 댓글 수정완료
 *          400:
 *              description: 잘못된 요청값
 *          401:
 *              description: 세션없음(로그인 안됨)
 *          403: 
 *              description: 현재 사용자의 피드가 아니거나 존재하지 않는 피드
 *          404:
 *              description: url의 commentId 값이 숫자가 아니거나, 해당 comment가 존재하지 않을 때
 */
router.put("/comment/:commentId",controller.putComment);

/**
 * @swagger
 *  /posts/comment/{commentId}:
 *    delete:
 *      summary: 댓글 삭제
 *      tags:
 *      - posts
 *      description: 현재 로그인한 유저가 자신의 댓글 삭제
 *      produces:
 *      - application/json
 *      parameters:
 *      - name : commentId
 *        in : path
 *        description: 해당 댓글 idx 값
 *      responses:
 *          204: 
 *              description: 댓글 삭제완료
 *          401:
 *              description: 세션 없음(로그인 안됨)
 *          403: 
 *              description: 현재 사용자의 피드가 아니거나 존재하지 않는 피드
 *          404:
 *              description: url의 commentId 값이 숫자가 아니거나, 해당 comment가 존재하지 않을 때
 */
router.delete("/comment/:commentId",controller.deleteComment);

/**
 * @swagger
 *  /posts/comment/{postId}:
 *    get:
 *      summary: 해당 피드의 댓글 조회
 *      tags:
 *      - posts
 *      description: 해당 피드(postId)의 전체 댓글 조회
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 댓글 조회 성공
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
 *                      updatedAt:
 *                          type: date
 *                          example: 2022-11-10 10:29:10
 *                      createdAt:
 *                          type: date
 *                          example: 2022-11-10 10:29:10
 *                      user_id:
 *                        type: integer
 *                        example: 1
 *                      post_id:
 *                        type: integer
 *                        example: 1     
 *       400:
 *        description: 잘못된 요청값                      
 *       401:
 *        description : 세션없음 (로그인 안됨)
 *       404:
 *        description: 해당 피드가 존재하지 않거나, url의 params가 숫자가 아님
 *       500:
 *        description : 서버에서 피드 조회 실패
 */
router.get("/comment/:postId",controller.getComment);

/**
 * @swagger
 *  /like/{id}:
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
 *       401:
 *        description: 세션이 없음(로그인 안되어있음)
 *  
 */
 router.put("/like/:id", controller.putLike);

module.exports = router, upload;