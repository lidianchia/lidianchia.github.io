<template>
  <div class="upload-container">
    <h2>Upload Your File</h2>
    <file-pond
      name="file"
      :allow-multiple="false"
      :server="serverConfig"
      label-idle="Drag & Drop your file or <span class='filepond--label-action'>Browse</span>"
      @processfile="handleFileUploaded"
    />
  </div>
</template>

<script>
import { FilePond } from "vue-filepond";
import "filepond/dist/filepond.min.css";

export default {
  name: "UploadFile",
  components: {
    FilePond,
  },
  data() {
    return {
      serverConfig: {
        url: "http://<YOUR_BACKEND_URL>/api/upload", // 替换为后端 API 的地址
        process: {
          method: "POST",
        },
      },
    };
  },
  methods: {
    handleFileUploaded(error, file) {
      if (error) {
        console.error("File upload failed:", error);
      } else {
        console.log("File uploaded successfully:", file);
      }
    },
  },
};
</script>

<style>
.upload-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
</style>
