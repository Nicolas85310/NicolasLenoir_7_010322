const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'video/x-msvideo': 'avi', //peut-être faire un 3ème multer pour les fichiers vidéos dans la version 2 ( pour limiter la taille des fichiers)
  'video/mp4': 'mp4',
  'video/mpeg': 'mpeg',
  'video/ogg': 'ogv',
  'video/mp2t': 'ts',
  'video/webm': 'webm',
  'video/3gpp': '3gp',
  'video/3gpp2': '3g2'
  
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'media/postMedia')
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0]
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + '_' + Date.now() + '.' + extension)
  }
})

module.exports = multer({storage: storage}).single('image')
