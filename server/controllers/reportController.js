import { uploadToCloudinary } from "../config/cloudinary.js";
import AiInsight from "../models/AiInsight.js";
import File from "../models/File.js";
import Vitals from "../models/Vitals.js";
import { sendFileToGeminiAndGetSummaries } from "../utils/gemini.js";
import { PDFParse } from 'pdf-parse';


export const uploadReport = async (req, res) => {
    try {
        if (!req.file) {
            return res
                .status(400)
                .json({ success: false, message: "No file provided" });
        }

        const mime = req.file.mimetype;
        const fileType = mime.includes("pdf") ? "pdf" : "image";

        // 1️⃣ Upload to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer);
        const fileUrl = result.secure_url;

        // 2️⃣ Save File record
        const createdFile = await File.create({
            userId: req.user.id,
            fileUrl,
            fileType,
            date: req.body.date ? new Date(req.body.date) : Date.now(),
        });

        // 3️⃣ Extract text if PDF
        let parsedText = "";
        let text = ""
        if (fileType === "pdf") {
            try {
                const parser = new PDFParse({ data: req.file.buffer });
                parsedText = await parser.getText();
                text = parsedText.text
                console.log(text)
                // const data = await PDFParse(req.file.buffer); // Use PDFParse directly
                // parsedText = data.text?.trim() || "";
                // console.log("PDF parsed successfully, text length:", parsedText.length);
            } catch (err) {
                console.error("PDF parsing failed:", err);
            }
        }

        // 4️⃣ Send to Gemini for AI summary
        let aiResult = {
            englishSummary: "",
            urduSummary: "",
            doctorQuestions: [],
        };

        try {
            aiResult = await sendFileToGeminiAndGetSummaries({
                fileType,
                fileUrl,
                text,
            });
        } catch (err) {
            console.error("AI summarization failed:", err);
        }

        // 5️⃣ Save AI insight
        const aiDoc = await AiInsight.create({
            fileId: createdFile._id,
            englishSummary: aiResult.englishSummary || "AI summary not available",
            urduSummary: aiResult.urduSummary || "",
            doctorQuestions: aiResult.doctorQuestions || [],
        });

        // 6️⃣ Return response
        return res.status(201).json({
            success: true,
            message: "Report uploaded successfully",
            file: createdFile,
            aiInsight: aiDoc,
        });
    } catch (error) {
        console.error("Upload report error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Server error during report upload",
            error: error.message,
        });
    }
};

export const getReportById = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ message: "Report not found" });
        const ai = await AiInsight.findOne({ fileId: file._id });
        return res.json({ success: true, file, ai });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getAllReports = async (req, res) => {
    try {
        const files = await File.find({ userId: req.user.id }).sort({ date: -1 });
        const aiIds = files.map((f) => f._id);
        const aiInsights = await AiInsight.find({ fileId: { $in: aiIds } });
        return res.json({ success: true, files, aiInsights });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getTimeline = async (req, res) => {
    try {
        const files = await File.find({ userId: req.user.id }).lean();
        const vitals = await Vitals.find({ userId: req.user.id }).lean();

        // normalize entries and merge
        const fileEntries = files.map((f) => ({
            kind: "file",
            _id: f._id,
            date: f.date || f.createdAt,
            fileUrl: f.fileUrl,
            fileType: f.fileType,
        }));
        const vitalsEntries = vitals.map((v) => ({
            kind: "vitals",
            _id: v._id,
            date: v.date || v.createdAt,
            bp: v.bp,
            sugar: v.sugar,
            weight: v.weight,
        }));

        const merged = [...fileEntries, ...vitalsEntries].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
        return res.json({ success: true, timeline: merged });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getRecentReports = async (req, res) => {
    try {
        const files = await File.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();

        const fileIds = files.map((f) => f._id);
        const aiInsights = await AiInsight.find({
            fileId: { $in: fileIds },
        }).lean();

        const recentReports = files.map((file) => ({
            ...file,
            aiInsight:
                aiInsights.find((ai) => ai.fileId.toString() === file._id.toString()) ||
                null,
        }));

        return res.status(200).json({ success: true, recentReports });
    } catch (error) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

