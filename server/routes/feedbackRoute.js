import express from "express";
import { feedback, getFeedbacks } from "../controllers/feedbackController.js";


const router = express.Router();


router.route("/feedback").post(feedback);
router.route("/feedbacks").get(getFeedbacks);


export default router;
