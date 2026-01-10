import cloudinary from "@/utils/cloudinary";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: err.message });

      try {
        const file = files.image;
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "my_app_images", // папка на Cloudinary
        });
        fs.unlinkSync(file.filepath); // удаляем временный файл
        res.status(200).json({ url: result.secure_url });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.status(405).json({ error: "Метод не разрешён" });
  }
}
