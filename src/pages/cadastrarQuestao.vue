<template>
  <q-page padding>
   Cadasrtar Questao


   <q-uploader
  url="http://localhost:8070/api/questao/salvarImagemQuestao"
  method="POST"
  :headers="{ 'content-type': 'multipart/form-data' }"
  @upload="postUpload"
  :send-raw="true"
  :no-content-type="true"
/>

  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  methods: {
  postUpload (event) {
    debugger
    console.log(event) // event is just the file name! The full response would be more useful
  },
  async getSignedUrl (file) {
    const contentType = file.type // To send the correct Content-Type
    const fileName = file.name // If you want to use this value to calculate the S3 Key.
    const response = await api.getSignedUrl({ fileName, contentType }) // Your api call to a sever that calculates the signed url.
    return response.data.url
  }
}
}
</script>

<style>
</style>
