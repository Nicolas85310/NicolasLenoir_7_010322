const multer = require('multer')

//extensions des fichiers images pour les avatars
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'media/avatar')
  },
  //génération d'un fichier rafraichis à chaque création de fichier imaga
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0]
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + '_' + Date.now() + '.' + extension)
  }
})

module.exports = multer({storage: storage}).single('image')