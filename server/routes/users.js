const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController")
const upload = require("../module/upload");

/**
 * @swagger
 *  /users/{userId}:
 *    get:
 *      summary: 유저 한명의 정보 조회
 *      tags:
 *      - users
 *      description: userId값에 해당하는 유저의 정보를 조회
 *      produces:
 *      - application/json
 *      parameters:
 *      - name : userId
 *        in : path
 *        description: 해당 유저 idx 값
 *      responses:
 *       200:
 *        description: 유저 조회 성공
 *        content:
 *          application/json:
 *            schema: 
 *              type: object
 *              properties:
 *                  id: 
 *                      type: integer
 *                      example: 1
 *                  email:
 *                      type: string
 *                      example: email@email.com
 *                  name:
 *                      type: string
 *                      example: 홍길동
 *                  nick:
 *                      type: string
 *                      example: gildong_
 *                  image:
 *                      type: string
 *                      example: https://storage.google...
 *                  self_intro:
 *                      type: string
 *                      example: I need a rest
 *       400:
 *        description: 해당 유저가 존재하지 않거나 잘못된 요청
 */
router.get("/:userId",controller.getUser);

/**
 * @swagger
 *  /users/{userId}/posts:
 *    get:
 *      summary: 해당 유저의 모든 피드 조회
 *      tags:
 *      - users
 *      description: userId에 해당하는 유저의 모든 피드(게시글) 조회
 *      produces:
 *      - application/json
 *      parameters:
 *      - name : userId
 *        in : path
 *        description: 해당 유저 idx 값
 *      responses:
 *       200:
 *        description: 해당 유저의 전체 피드 조회 성공
 *        content:
 *          application/json:
 *            schema: 
 *              type: array
 *              items:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                          description: 피드 idx
 *                          example: 1
 *                      user_id:
 *                          type: integer
 *                          example: 1
 *                      content:
 *                          type: string
 *                          example: 안녕하세요
 *                      created_at:
 *                          type: date
 *                          example : 2022-11-11 10:40:20
 *                      updated_at:
 *                          type: date
 *                          example: 2022-11-10 10:29:10
 *                      PostImages:
 *                        type: object
 *                        properties:
 *                          img_url: 
 *                            type: string
 *                            example: https://storage.go...                                  
 *       400:
 *        description: 해당 유저가 존재하지 않거나 잘못된 요청
 */
router.get("/:userId/posts",controller.getUserPosts);

/* html form에 PUT Method가 존재하지 않음
    추후 수정 필요 (ex. PUT -> POST ) */
/**
 * @swagger
 *  /users/info:
 *   put:
 *      summary : 유저 정보 수정
 *      tags:
 *      - users
 *      description: 현재 세션 유저의 정보 수정
 *      produces:
 *      - application/json
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: 변경할 사용자 이름
 *                  nick:
 *                      type: string
 *                      description: 변경할 사용자 별명
 *                  pw:
 *                      type: string
 *                      description: 변경할 사용자 비밀번호
 *                  selfIntro:
 *                      type: string
 *                      description: 변경할 사용자 자기소개
 *      responses:
 *          201: 
 *              description: 유저 정보 변경 성공
 *          400: 
 *              description: 유저 정보가 DB에 존재하지 않거나 잘못된 요청
 *          401:
 *              description: 세션 유저 없음(로그인 안됨)
 */
router.put("/info",controller.putUserInfo);

/**
 * @swagger
 *  /users/image:
 *   post:
 *      summary: 유저 프로필사진 변경
 *      tags:
 *      - users
 *      description: 현재 세션유저의 프로필 사진 변경
 *      produces:
 *      - application/json
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *                type: object
 *                properties:
 *                  file:
 *                    type: string
 *                    format: binary
 *      responses:
 *          201:
 *              description: 세션 유저의 프로필사진이 정상적으로 변경됨
 *          400:
 *              description: 첨부된 파일이 없거나, DB 유저 정보가 없는 등 잘못된 요청
 *          401: 
 *              description: 세션 유저가 없음(로그인 안됨)
 */
router.post("/:userId/image",upload.single('file'),controller.postUserImage);

/**
 * @swagger
 *   /users/follow:
 *    put:
 *      summary: 유저 팔로우
 *      tags:
 *      - users
 *      description: 이미 팔로잉 중인 경우 팔로우 취소, 아닐 경우 팔로우
 *      produces:
 *      - application/json
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string
 *                              description: 팔로우할 유저의 id
 *      responses:
 *          201:
 *              description: 팔로우 성공
 *          204: 
 *              description: 언팔로우 성공
 *          400:
 *              description: 본인 스스로를 팔로우 요청하거나, DB에 팔로우하려는 유저가 존재하지 않는 경우 및 잘못된 요청
 * 
 */
router.put("/follow",controller.putFollow);

/**
 * @swagger
 *  /users/invoice:
 *   post:
 *      summary: 문의사항 작성
 *      tags:
 *      - users
 *      description: 문의사항 작성
 *      produces:
 *      - application/json
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: 문의사항 제목
 *                          content:
 *                              type: string
 *                              descrtipion: 문의사항 내용
 *      responses:
 *          201:
 *              description: 문의사항 작성 성공
 *          400:
 *              description: 잘못된 요청
 *          401:
 *              description: 세션이 없음(로그인 안됨)
 */
router.post("/invoice",controller.postInvoice);

module.exports = router;