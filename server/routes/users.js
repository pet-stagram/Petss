const express = require("express");
const router = express.Router();




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