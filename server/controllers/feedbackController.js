import { Feedback } from "../models/feedbackModel.js";



export const feedback = async (req, res)=>{
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
          return res.status(400).json({ message: 'All fields are required.' });
        }

        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully.' });
      } catch (error) {
        console.log(error);
      }
}


export const getFeedbacks = async (req, res) => {
    try {
      const feedbacks = await Feedback.find().sort({ createdAt: -1 });
      res.json(feedbacks);
    } catch (error) {
      console.log(error);
    }
  };