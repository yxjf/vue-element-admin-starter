<template>
  <div style="height: 100%; width: 100%"></div>
</template>

<script>
// 代码编辑器
// https://github.com/thlorenz/brace
// https://github.com/chairuosen/vue2-ace-editor
import * as ace from 'brace';
import 'brace/ext/language_tools';
import 'brace/ext/emmet';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_dark';
import 'brace/theme/eclipse';
import 'brace/theme/chrome';

export default {
  name: 'VueBrace',
  props: {
    value: {
      type: String,
      required: true,
    },
    lang: String,
    theme: String,
    options: Object,
  },
  data: function() {
    return {
      editor: null,
      contentBackup: '',
    };
  },
  methods: {},
  watch: {
    value: function(val) {
      if (this.contentBackup !== val) this.editor.setValue(val, 1);
    },
    theme: function(newTheme) {
      this.editor.setTheme('ace/theme/' + newTheme);
    },
    lang: function(newLang) {
      this.editor.getSession().setMode('ace/mode/' + newLang);
    },
    options: function(newOption) {
      this.editor.setOptions(newOption);
    },
  },
  beforeDestroy: function() {
    this.editor.destroy();
    this.editor.container.remove();
  },
  mounted: function() {
    let vm = this;
    let lang = this.lang || 'javascript';
    let theme = this.theme || 'github';

    let editor = (vm.editor = ace.edit(this.$el));

    this.$emit('init', editor);

    editor.$blockScrolling = Infinity;
    // editor.setOption("enableEmmet", true);
    editor.getSession().setMode('ace/mode/' + lang);
    editor.setTheme('ace/theme/' + theme);
    editor.setValue(this.value, 1);

    editor.on('change', function() {
      let content = editor.getValue();
      vm.$emit('input', content);
      vm.contentBackup = content;
    });
    if (vm.options) editor.setOptions(vm.options);
  },
};
</script>
