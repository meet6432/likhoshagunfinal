"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const prisma_1 = __importDefault(require("../lib/prisma"));
//signin controller
const signin = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = user_1.signinBody.safeParse(req.body);
    if (!requestBody.success) {
        return res.status(411).json({
            message: "Incorrect inputs",
        });
    }
    const userDetails = requestBody.data;
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email: userDetails.email,
            password: userDetails.password,
        },
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, "1234");
        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({
            // token: token,
            message: "success",
        });
        return;
    }
    res.status(411).json({
        message: "Error while logging in",
    });
});
exports.signin = signin;
// signup controller
const signup = (req, res, err) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = user_1.signupBody.safeParse(req.body);
    if (!requestBody.success) {
        return res.status(400).json({
            message: "Email already taken / Incorrect inputs1",
        });
    }
    const userDetails = requestBody.data;
    const existingUser = yield prisma_1.default.user.findFirst({
        where: {
            username: userDetails.name,
        },
    });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs",
        });
    }
    const user = yield prisma_1.default.user.create({
        data: {
            username: userDetails.name,
            password: userDetails.password,
            email: userDetails.email,
        },
    });
    const userId = user.id;
    const token = jsonwebtoken_1.default.sign({ userId }, "1234");
    res.cookie("access_token", token, {
        httpOnly: true,
    }).json({
        message: "User created successfully",
    });
});
exports.signup = signup;
// export const googleAuth = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     try {
//         const requestBody = signupBody.safeParse(req.body);
//         if (!requestBody.success) {
//             return res.status(400).json({
//                 message: "Email already taken / Incorrect inputs",
//             });
//         }
//         const userDetails: SignupType = requestBody.data;
//         const existingUser = await prisma.user.findFirst({
//             where: {
//                 email: req.body.email,
//             },
//         });
//         // const user = await User.findOne({ email: req.body.email });
//         if (existingUser) {
//             const token = jwt.sign(
//                 { id: existingUser.id },
//                 process.env.JWT as string,
//             );
//             res.cookie("access_token", token, {
//                 httpOnly: true,
//             })
//                 .status(200)
//                 .json(existingUser);
//         } else {
//             const user = await prisma.user.create({
//                 data: {
//                     username: userDetails.username,
//                     password: userDetails.password,
//                     email: userDetails.email,
//                 },
//             });
//             const userId = user.id;
//             const token = jwt.sign(
//                 { id: userId },
//                 process.env.JWT as string,
//             );
//             res.cookie("access_token", token, {
//                 httpOnly: true,
//             })
//                 .status(200)
//                 .json(user);
//         }
//     } catch (err) {
//         next(err);
//     }
// };
