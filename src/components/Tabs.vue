<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        :class="{[classPrefix+'-tabs-item']: classPrefix, selected: item.value===value}"
        @click="select(item)"
        :style="{height: height}">{{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string, value: string }

@Component
export default class Types extends Vue {
  @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];
  @Prop(String) classPrefix?: string;
  @Prop(String) readonly value!: string;
  @Prop({type: String, default: '64px'}) height!: number;

  select(item: DataSourceItem) {
    console.log('dianji', item.value);
    this.$emit('update:value', item.value);
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/helpers.scss";

.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    //height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>