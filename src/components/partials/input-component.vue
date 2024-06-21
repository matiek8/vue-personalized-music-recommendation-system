<template lang="pug">
.input(:class="classes")
  input(
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    @input="inputEvent"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
    ref="input"
  )
  .input-slot-errors(v-if="$slots.errors")
    slot(name="errors")
</template>

<script>
export default {
  name: 'input-component',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
  },
  emits: ['pressEnter', 'change', 'update:modelValue'],
  data() {
    return {
      notActiveYet: true,
      focused: false,
    }
  },
  computed: {
    classes() {
      let classes = ''
      if (this.error) {
        classes += `error `
      }
      return classes
    }
  },
  methods: {
    inputEvent() {
      this.$emit('update:modelValue', this.$refs.input.value)
      this.$emit('change', this.$refs.input.value)
    },
  }
}
</script>

<style scoped lang="scss">
.input {
  position: relative;
  border: solid 1px black;
  border-radius: 60px;
  padding: 14px 20px;

  input {
    height: 100%;
    font-size: 20px;
    font-weight: 300;
    line-height: 25px;
    outline: none;
    border: none;
    background: transparent;
    color: var(--c-text);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &::placeholder {
      color: black;
    }
  }
}
</style>