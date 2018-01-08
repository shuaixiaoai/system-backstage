<template>
  <div class="upload-component">
      <div class="upload-wrapper">
        <span class="btn-upload" :class="{ 'is-disabled': disabled }">点击上传</span>
        <input type="file" name="upload-file" :class="{ 'is-disabled': disabled }" accept="image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="uploadInput" class="file-input">
      </div>
      <span class="tip">只能上传jpg/png/jpeg文件，且不超过500kb</span>
      <ul class="upload-lists">
        <li class="img-list" v-if="imageUrl">
          <img :src="imageUrl" alt="">
          <a>{{name}}</a>
          <label></label>
          <span class="el-icon-check"></span>
        </li>
      </ul>
  </div>
</template>

<script>
import api from '../api/axios'
export default {
  name: 'upload',
  props: {
    url: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imageUrl: '',
      name: ''
    }
  },
  methods: {
    changeImage (e) {
      this.name = e.target.files[0].name
      let fd = new FormData()
      fd.append('file', this.$refs.uploadInput.files[0])
      let url = this.url
      api.uploadRequest(url, fd).then(({data}) => {
        if (data.code === 0) {
          let src = data.src
          this.$message.success(data.message)
          this.imageUrl = src
          this.$emit('success', src)
        } else {
          this.$message.console.error(data.message)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.upload-component{
  width: auto;
  height: auto;
  .upload-wrapper{
    width: auto;
    height: 30px;
    position: relative;
    .file-input{
      position: absolute;
      top: 0;
      left: 0;
      width: 90px;
      height: 30px;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid transparent;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      user-select: none;
      font-size: 14px;
      opacity: 0;
    }
    .btn-upload{
      position: absolute;
      top: 0;
      left: 0;
      width: 90px;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      text-align: center;
      font-size: 14px;
      border-radius: 4px;
      padding: 0 10px;
      color: #fff;
      background-color: #20a0ff;
      border: 1px solid  #20a0ff;
    }
  }
  .tip {
    margin-top: 12px;
    font-size: 12px;
    color: #8391a5;
  }
  .upload-lists{
    width: auto;
    height: auto;
    .img-list{
      position: relative;
      overflow: hidden;
      background-color: #fff;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      margin-top: 10px;
      padding: 10px 10px 10px 90px;
      height: 92px;
      line-height: 72px;
      img {
        vertical-align: middle;
        display: inline-block;
        width: 70px;
        height: 70px;
        float: left;
        position: relative;
        z-index: 1;
        margin-left: -80px;
      }
      a{
        color: #48576a;
        display: block;
        margin-right: 40px;
        overflow: hidden;
        padding-left: 4px;
        text-overflow: ellipsis;
        transition: color .3s;
        white-space: nowrap;
      }
      label {
        display: block;
        position: absolute;
        right: -17px;
        top: -7px;
        width: 46px;
        height: 26px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 1px 1px #ccc;
        // i{
        //   font-size: 12px;
        //   margin-top: 12px;
        //   color: #fff;
        //   transform: rotate(-45deg) scale(.8);
        // }
      }
      .el-icon-check{
        display: block;
        position: absolute;
        right: -23px;
        top: 2px;
        width: 46px;
        height: 26px;
        cursor: pointer;
        opacity: 1;
        color: #fff;
        transform: scale(.7);
      }
    }
  }
}
</style>
