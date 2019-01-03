<template>
  <div class="editor">
    <editor-menu-bar :editor="editor">
      <div class="editor-menubar" slot-scope="{ commands, isActive, getMarkAttrs }">
        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
          title="加粗"
        >
          <i class="fa fa-bold"></i>
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
          title="斜体"
        >
          <i class="fa fa-italic"></i>
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
          title="删除线"
        >
          <i class="fa fa-strikethrough"></i>
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
          title="下划线"
        >
          <i class="fa fa-underline"></i>
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
          title="段落"
        >
          <i class="fa fa-paragraph"></i>
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
          title="标题一"
        >
          H1
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
          title="标题二"
        >
          H2
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
          title="标题三"
        >
          H3
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
          title="无序列表"
        >
          <i class="fa fa-list-ul"></i>
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
          title="有序列表"
        >
          <i class="fa fa-list-ol"></i>
        </button>

        <button
          class="editor-menubar-button"
          @click="showImagePrompt(commands.image)"
          title="插入图片"
        >
          <i class="fa fa-image"></i>
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
          title="引用"
        >
          <i class="fa fa-quote-right"></i>
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.link() }"
          @click="showLinkMenu(getMarkAttrs('link'))"
          title="超链接"
        >
          <i class="fa fa-link"></i>
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
          title="行内代码"
        >
          <i class="fa fa-code"></i>&nbsp;行
        </button>

        <button
          class="editor-menubar-button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
          title="代码块"
        >
          <i class="fa fa-code"></i>&nbsp;块
        </button>

        <button
          class="editor-menubar-button"
          @click="commands.createTable({ rowsCount: 3, colsCount: 3, withHeaderRow: true })"
          title="新建表格"
        >
          <i class="fa icon-table"></i>
        </button>

        <span v-if="isActive.table()">
          <button class="editor-menubar-button" @click="commands.deleteTable" title="删除表格">
            <i class="fa icon-delete_table"></i>
          </button>
          <button
            class="editor-menubar-button"
            @click="commands.addColumnBefore"
            title="在前面插入列"
          >
            <i class="fa icon-add_col_before"></i>
          </button>
          <button
            class="editor-menubar-button"
            @click="commands.addColumnAfter"
            title="在后面插入列"
          >
            <i class="fa icon-add_col_after"></i>
          </button>
          <button class="editor-menubar-button" @click="commands.deleteColumn" title="删除列">
            <i class="fa icon-delete_col"></i>
          </button>
          <button class="editor-menubar-button" @click="commands.addRowBefore" title="在上面插入行">
            <i class="fa icon-add_row_before"></i>
          </button>
          <button class="editor-menubar-button" @click="commands.addRowAfter" title="在下面插入行">
            <i class="fa icon-add_row_after"></i>
          </button>
          <button class="editor-menubar-button" @click="commands.deleteRow" title="删除行">
            <i class="fa icon-delete_row"></i>
          </button>
          <button
            class="editor-menubar-button"
            @click="commands.toggleCellMerge"
            title="合并单元格"
          >
            <i class="fa icon-combine_cells"></i>
          </button>
        </span>

        <button class="editor-menubar-button" @click="commands.undo" title="撤销">
          <i class="fa fa-undo"></i>
        </button>

        <button class="editor-menubar-button" @click="commands.redo" title="重做">
          <i class="fa fa-repeat"></i>
        </button>

        <form
          class="link-form"
          v-if="linkMenuIsActive"
          @submit.prevent="setLinkUrl(commands.link, linkUrl)"
        >
          <input
            class="link-input"
            type="text"
            v-model="linkUrl"
            placeholder="https://"
            ref="linkInput"
            @keydown.esc="hideLinkMenu"
          />
          <button
            class="editor-menubar-button"
            @click="setLinkUrl(commands.link, null)"
            type="button"
          >
            <i class="fa fa-remove"></i>
          </button>
        </form>
      </div>
    </editor-menu-bar>

    <editor-content
      class="editor-content"
      :style="{ height: autoHeight ? 'auto' : height + 'px' }"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Placeholder,
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
} from 'tiptap-extensions';

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    autoHeight: {
      type: Boolean,
      default: false,
      required: false,
    },
    height: {
      type: Number,
      default: 200,
      required: false,
    },
    editable: {
      type: Boolean,
      required: false,
      default: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    emptyClass: {
      type: String,
      required: false,
      default: '',
    },
    onInit: {
      type: Function,
      default: () => {},
      required: false,
    },
    onFocus: {
      type: Function,
      default: () => {},
      required: false,
    },
    onBlur: {
      type: Function,
      default: () => {},
      required: false,
    },
    onUpdate: {
      type: Function,
      default: () => {},
      required: false,
    },
    // 获取 editor 对象，用于调用 editor 方法
    getEditor: {
      type: Function,
      default: () => {},
      required: false,
    },
  },
  data() {
    console.log(this.value);
    return {
      editor: new Editor({
        editable: this.editable,
        extensions: [
          new Placeholder({
            emptyClass: this.emptyClass || 'is-empty',
            emptyNodeText: this.placeholder || '请输入（支持部分Markdown语法实时转换）...',
          }),
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new BulletList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Table(),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
        ],
        onInit: this.onInit,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onUpdate: obj => {
          const state = obj.getHTML();
          this.$emit('input', state);
          this.onUpdate(obj);
        },
        content: this.value,
      }),
      linkUrl: null,
      linkMenuIsActive: false,
    };
  },
  watch: {
    // value() {
    //   this.editor.setContent(this.value)
    // }
  },
  mounted() {
    this.getEditor(this.editor);
  },
  beforeDestroy() {
    this.editor.destroy();
  },

  methods: {
    showImagePrompt(command) {
      const src = prompt('请输入图片URL，或者把图片拖拽到编辑器中');
      if (src !== null) {
        command({ src });
      }
    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
      this.editor.focus();
    },
  },
};
</script>

<style lang="less">
.ProseMirror {
  padding: 5px 10px;
  outline: none;

  p.is-empty:first-child::before {
    content: attr(data-empty-text);
    float: left;
    color: #aaa;
    pointer-events: none;
    height: 0;
    font-style: italic;
  }

  pre {
    padding: 0.7rem 1rem;
    border-radius: 5px;
    background: #f2f2f2;
    color: #333;
    font-size: 0.8rem;
    overflow-x: auto;

    code {
      display: block;
    }
  }

  p code {
    display: inline-block;
    padding: 0 0.4rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: 700;
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
  }

  ol,
  ul {
    padding-left: 1rem;
  }

  blockquote {
    border-left: 3px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
    padding-left: 0.8rem;
    font-style: italic;
  }
  img {
    max-width: 100%;
  }
  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
  }
  table td,
  table th {
    min-width: 1em;
    border: 1px solid #999;
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }

  table th {
    background-color: #f2f2f2;
  }

  table td > p,
  table th > p {
    margin: 5px;
  }

  table th {
    font-weight: 700;
    text-align: left;
  }

  table .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
  }

  table .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 4px;
    z-index: 20;
    background-color: #adf;
    pointer-events: none;
  }

  .tableWrapper {
    margin: 1em 0;
    overflow-x: auto;
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}
</style>

<style lang="less" scoped>
.editor-menubar {
  border: 1px solid #dcdfe6;
  border-bottom: none;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;

  .editor-menubar-button {
    font-weight: 700;
    display: inline-flex;
    background: rgba(0, 0, 0, 0);
    border: 0;
    color: #000;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      background-color: rgba(64, 158, 255, 0.2);
    }

    &.is-active {
      color: #409eff;
    }
  }

  .link-form {
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;

    .link-input {
      width: 400px;
    }
  }
}

.editor-content {
  overflow: auto;
  border: 1px solid #dcdfe6;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
