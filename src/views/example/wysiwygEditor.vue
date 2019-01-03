<template>
  <div>
    <editor :getEditor="getEditor" :height="500" :autoHeight="false" v-model="content"></editor>
    <p>HTML值</p>
    <el-input type="textarea" v-model="content" :rows="5"></el-input>
    <el-button @click="setValue">反写编辑器内容</el-button>
  </div>
</template>

<script>
import editor from '@/components/RichTextEditor';

export default {
  name: 'wysiwygEditor',
  components: {
    editor,
  },
  data() {
    return {
      content: `<h1>标题一</h1><h2>标题二</h2><h3>标题三</h3><p>正文</p><blockquote><p>引用文字</p></blockquote><ul><li><p>无序列表 <code>code</code></p></li><li><p>无序列表</p></li></ul><table><tbody><tr><td><p>表格</p></td><td><p></p></td><td><p></p></td></tr><tr><td><p></p></td><td><p></p></td><td><p></p></td></tr></tbody></table><ol><li><p>有序列表</p></li><li><p>有序列表</p></li></ol><pre><code>code block</code></pre>`,
      editor,
    };
  },
  methods: {
    getEditor(editor) {
      this.editor = editor;
    },
    setValue() {
      this.editor.setContent(this.content);
    },
  },
};
</script>

<style lang="less" scoped>
.editor {
  margin-top: 10px;
  width: 100%;
}
</style>
