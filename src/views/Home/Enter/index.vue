<template>
    <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            拖拽上传或<em>选择文件</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                支持DOCX、JPEG/PNG图片格式简历录入
            </div>
        </template>
    </el-upload>
</template>

<script>

export default {

}
</script>

