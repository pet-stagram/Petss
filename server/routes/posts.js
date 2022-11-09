const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController.js");

/**
 * @swagger
 *  /posts:
 *    get:
 *      tags:
 *      - getPostsAll
 *      description: 팔로잉 중인 유저의 모든 피드 조회
 *      produces:
 *      - application/json
 *      responses:
 *       200:
 *        description: 전체 피드 조회 성공
 *       204:
 *        description: 조회 결과가 없음(팔로우를 안했거나, 팔로잉한 사람의 게시글이 없음)
 *       400:
 *        description : 피드 조회 실패
 *       401:
 *        description : 로그인 필요
 */
router.get("/",controller.getPosts);

/**
 * @swagger
 *  /posts/{id}:
 *    get:
 *      tags:
 *      - getPostOne
 *      description: 피드 하나만 보기
 *      produces:
 *      - application/json
 *      parameters:
 *      - name : id
 *        in : path
 *        description: 해당 피드 idx 값
 *      responses:
 *       200:
 *        description: 피드 조회 성공
 *       400:
 *        description : 피드 조회 실패
 *       401:
 *        description : 로그인 필요
 */
router.get("/:id",controller.getPosts);

module.exports = router;