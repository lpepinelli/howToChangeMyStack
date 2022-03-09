const fs = require('fs').promises

const saveImage = async (file) => {
  let tmp_path = file.path;
  let target_path = 'public/images/' + file.originalname;
  const data = await fs.readFile(tmp_path)
  await fs.writeFile(target_path, data)
  await fs.unlink(tmp_path)
  return true
}

const deleteImage = async(fileName) => {
  let path = 'public/images/'+ fileName
  await fs.unlink(path)
  return true
}

const getImage = async(fileName) => {
  let path = 'public/images/'+ fileName
  return await fs.readFile(path)
}

module.exports = {
  saveImage,
  deleteImage,
  getImage
}