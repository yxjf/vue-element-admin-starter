<template>
  <div>
    <el-form :inline="true" ref="form" label-width="120px">
      <el-form-item label="语言">
        <el-select v-model="lang" placeholder="请选择语言">
          <el-option label="Javascript" value="javascript"></el-option>
          <el-option label="Python" value="python"></el-option>
          <el-option label="Java" value="java"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="皮肤">
        <el-select v-model="theme" placeholder="请选择皮肤">
          <el-option label="github" value="github"></el-option>
          <el-option label="chrome" value="chrome"></el-option>
          <el-option label="monokai" value="monokai"></el-option>
          <el-option label="eclipse" value="eclipse"></el-option>
          <el-option label="solarized_dark" value="solarized_dark"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="editor">
      <editor
        v-model="sourceCode"
        :options="options"
        :lang="lang"
        :theme="theme"
        @init="sourceCodeEditorInit"
      ></editor>
    </div>
  </div>
</template>

<script>
import editor from '@/components/VueBrace';

export default {
  name: 'codeEditor',
  components: {
    editor,
  },
  data() {
    return {
      lang: 'javascript',
      theme: 'github',
      sourceCode: '',
      options: {
        enableBasicAutocompletion: true, // 自动补全
        enableSnippets: true,
        enableLiveAutocompletion: true,
        highlightActiveLine: true,
        highlightSelectedWord: true,
        useWorker: true, // ace lint
      },
      sourceCodeEditor: null, // editor 引用
    };
  },

  methods: {
    sourceCodeEditorInit(editor) {
      // 获取 editor 引用
      this.sourceCodeEditor = editor;
    },
  },
};
</script>

<style lang="less" scoped>
.editor {
  margin-top: 10px;
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
}
</style>
