const express = require("express");
const router = express.Router();
const controller = require("../controllers/chatController");

/**
 * @swagger
 *  /chat/rooms:
 *   get:
 *      summary: 현재 세션의 대화목록 조회
 *      tags:
 *      - chat
 *      description: 현재 세션 유저(로그인된 유저)의 모든 대화를 조회
 *      produces:
 *      - application/json
 *      responses:
 *          200:
 *              description: 모든 대화 조회 성공
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties: 
 *                                  id:
 *                                      type: integer
 *                                      example: 1
 *                                  lastChat:
 *                                      type: String
 *                                      example: 마지막채팅
 *                                  user1Read:
 *                                      type: boolean
 *                                      example: true
 *                                  user2Read:
 *                                      type: boolean
 *                                      example: false
 *                                  user1:
 *                                      type: integer
 *                                      example: 1
 *                                  user2:
 *                                      type: integer
 *                                      example: 2
 *                                  User1:
 *                                      type: object
 *                                      properties:
 *                                          id: 
 *                                              type: integer
 *                                              example: 1
 *                                          name: 
 *                                              type: string
 *                                              example: 홍길동
 *                                          image: 
 *                                              type: string
 *                                              example: https://storage...
 *                                  User2:
 *                                      type: object
 *                                      properties:
 *                                          id: 
 *                                              type: integer
 *                                              example: 1
 *                                          name: 
 *                                              type: string
 *                                              example: 홍길동
 *                                          image: 
 *                                              type: string
 *                                              example: https://storage...
 *          500: 
 *              description: 세션 에러 혹은 DB 조회 에러
*/
router.get("/rooms", controller.getChatRooms);
/**
 * @swagger
 *  /chat/message:
 *   get:
 *      summary: 현재 대화 조회
 *      tags:
 *      - chat
 *      description: 선택한 대화의 메시지를 모두 조회
 *      produces:
 *      - application/json
 *      responses:
 *          200:
 *              description: 모든 대화 조회 성공
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties: 
 *                                  id:
 *                                      type: integer
 *                                      example: 1
 *                                  content:
 *                                      type: string
 *                                      example: Hello~
 *                                  senderId:
 *                                      type: integer
 *                                      example: 1
 *                                  receiverId:
 *                                      type: integer
 *                                      example: 2
 *                                  sendAt:
 *                                      type: date
 *                                      example: 2022-11-17 10:10:00
 *                                  conversationId:
 *                                      type: integer
 *                                      example: 1
 *                                  Sender:
 *                                      type: object
 *                                      properties:
 *                                          id: 
 *                                              type: integer
 *                                              example: 1
 *                                          name: 
 *                                              type: string
 *                                              example: 홍길동
 *                                          image: 
 *                                              type: string
 *                                              example: https://storage...
 *                                          nick: 
 *                                              type: string
 *                                              example: gildong__
 *                                  Receiver:
 *                                      type: object
 *                                      properties:
 *                                          id: 
 *                                              type: integer
 *                                              example: 1
 *                                          name: 
 *                                              type: string
 *                                              example: 홍길동
 *                                          image: 
 *                                              type: string
 *                                              example: https://storage...
 *                                          nick: 
 *                                              type: string
 *                                              example: gildong__2
 *          500: 
 *              description: 세션 에러 혹은 DB 조회 에러
*/
router.get("/message",controller.getMessage);

router.post("/message", controller.postMessage);

module.exports = router;