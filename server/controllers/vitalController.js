// controllers/vitalsController.js
import Vitals from "../models/Vitals.js";

export const addVitals = async (req, res) => {
  try {
    const { bp, sugar, weight, date } = req.body;
    const doc = await Vitals.create({
      userId: req.user.id,
      bp,
      sugar,
      weight,
      date: date ? new Date(date) : Date.now(),
    });
    return res.status(201).json({ success: true, vitals: doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getVitals = async (req, res) => {
  try {
    const list = await Vitals.find({ userId: req.user.id }).sort({ date: -1 });
    return res.json({ success: true, vitals: list });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
