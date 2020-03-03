const ExceptionHandler = require('./ExceptionHandler');
const fse = require('fs-extra');
const path = require('path');
const Listing = require('../models/listing');

const fileHandler = async (model, req, res, next) => {
  if (!req.files)
    return next(new ExceptionHandler('Please upload a file', 400));

  const profile = req.files.profile;

  // check if image
  if (!profile.mimetype.startsWith('image'))
    return next(new ExceptionHandler('Please upload an image file', 400));

  if (profile.size > process.env.MAX_FILE_SIZE)
    return next(
      new ExceptionHandler(
        `Max file size of ${process.env.MAX_FILE_SIZE} exceeded`,
        400,
      ),
    );

  const date = new Date();
  const dir = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

  // filename
  profile.name = `${model._id}_${Date.now()}${path.parse(profile.name).ext}`;
  const dbPath = `${dir}/${profile.name}`;
  try {
    // create dirs
    await fse.ensureDir(`${process.env.FILE_UPLOAD_PATH}/${dir}`);

    // upload file
    profile.mv(`${process.env.FILE_UPLOAD_PATH}/${dbPath}`, async err => {
      if (err) {
        console.log(err);
        return next(new ExceptionHandler('File upload failed', 500));
      }

      await Listing.findByIdAndUpdate(
        req.params.id,
        { photoMain: dbPath },
        { new: true, runValidators: false },
      );

      return res.status(200).json({
        success: true,
        path: dbPath,
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = fileHandler;
