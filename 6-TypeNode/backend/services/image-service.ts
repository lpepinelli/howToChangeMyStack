import fs from 'fs/promises'

const saveImage = async (file: Express.Multer.File | undefined) => {
  if(file){
    let tmp_path = file.path;
    let target_path = 'public/images/' + file.originalname;
    const data = await fs.readFile(tmp_path)
    await fs.writeFile(target_path, data)
    await fs.unlink(tmp_path)
    return true
  }
  return false
}

const deleteImage = async(fileName: string) => {
  let path = 'public/images/'+ fileName
  await fs.unlink(path)
  return true
}

const getImage = async(fileName: string) => {
  let path = 'public/images/'+ fileName
  return await fs.readFile(path)
}

export default {
  saveImage,
  deleteImage,
  getImage
}