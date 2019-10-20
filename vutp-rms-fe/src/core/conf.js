export default {
    server: {
      url: process.env.VUE_APP_SERVERURL,
      apis: {
        models: '/teachers',
        processImage: 'ObjectDetection/Model/{{model_id}}/LabelFile/'
      }
    }
  }