const service = require("../services/usersService");

module.exports = {
    getMe: async (req, res) => {
        const currentUser = req.session.u_id;
        if (!currentUser) {
            res.sendStatus(401);
        } else {
            try {
                const result = await service.selectUser(currentUser);
                res.json(result);
            } catch (err) {
                res.sendStatus(400);
                console.error(err);
            }
        }
    },
    getUser: async (req, res) => {
        const currentUser = req.session.u_id;
        if (false) {
            res.sendStatus(401);
        } else {
            const userId = req.params.userId;
            try {
                const result = await service.selectUser(userId);
                res.status(200).json(result);
            } catch (err) {
                console.error(err);
                res.sendStatus(400);
            }
        }
    },
    putUserInfo: async (req, res) => {
        console.log(req.body);
        const currentUser = req.session.u_id;
        if (!currentUser) {
            res.sendStatus(401);
        } else {
            const userDto = {
                id: currentUser,
                name: req.body.name,
                nick: req.body.nick,
                email: req.body.email,
                selfIntro: req.body.selfIntro,
                phone: req.body.phone
            };
            const userPw = req.body.pw;
            try {
                if(userDto.password)
                    await service.updateUserInfo(userDto);
                else
                    await service.updateUserPw(currentUser, userPw);
                res.sendStatus(201);
            } catch (err) {
                res.sendStatus(400);
                console.error(err);
            }
        }
    },
    postUserImage: async (req, res) => {
        const currentUser = req.session.u_id;
        const userDto = {
            id: currentUser, // 현재 세션 유저
            file: req.file.path,
            isBasic: false,
        };
        if (!currentUser) {
            res.sendStatus(401);
        } else if (isNaN(req.params.userId)) {
            res.sendStatus(404);
        } else if (userDto.file === undefined) {
            res.sendStatus(400);
        } else {
            try {
                // await service.
                await service.updateUserImage(userDto);
                res.sendStatus(201);
            } catch (err) {
                console.error(err);
                res.sendStatus(400);
            }
        }
    },
    postUserImageBasic: async (req, res) => {
        const currentUser = req.session.u_id;
        if (!currentUser) {
            res.sendStatus(401);
        } else if (isNaN(req.params.userId)) {
            res.sendStatus(404);
        } else {
            const userDto = {
                id: currentUser,
                file: "public/images/basic_profile.jpeg",
                isBasic: true,
            };
            try {
                await service.updateUserImage(userDto);
                res.sendStatus(201);
            } catch (err) {
                console.error(err);
                res.sendStatus(400);
            }
        }
    },
    putFollow: async (req, res) => {
        const currentUser = req.session.u_id;
        if (!currentUser) {
            res.sendStatus(401);
        } else {
            const followDto = {
                currentUser,
                profileUser: isNaN(req.body.userId)
                    ? req.body.userId
                    : parseInt(req.body.userId),
            };
            try {
                const result = await service.updateFollow(followDto);
                if (result === "Bad Request") {
                    res.sendStatus(400);
                } else if (result === "Created") {
                    res.sendStatus(201);
                } else {
                    res.sendStatus(204);
                }
            } catch (err) {
                res.sendStatus(400);
                console.error(err);
            }
        }
    },
    postInvoice: async (req, res) => {
        const currentUser = req.session.u_id;
        if (!currentUser) {
            res.sendStatus(401);
        } else {
            const invoiceDto = {
                title: req.body.title,
                content: req.body.content,
                userId: currentUser,
            };
            try {
                await service.insertInvoice(invoiceDto);
                res.sendStatus(201);
            } catch (err) {
                console.error(err);
                res.sendStatus(400);
            }
        }
    },
};
