<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"></Tabs>
    <div class="notes">
<!--      <FormItem field-name="备注" placeholder="请输入备注"
                :value="record.notes"
                @update:value="onUpdateNotes"></FormItem>-->
      <FormItem field-name="备注" placeholder="请输入备注"
                :value.sync="record.notes"></FormItem>
    </div>
    <Tags @update:value="record.tags = $event"></Tags>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import store from '@/store/index.ts';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';


@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
  get recordList() {
    return store.state.recordList;
  }

  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0, createdAt: ''
  };

  created() {
    store.commit('fetchRecords');
  }

 /* onUpdateNotes(value: string) {
    this.record.notes = value;
  }*/

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      alert('请至少选择一个标签');
      return;
    }
    this.$store.commit('createRecord', this.record);
    if (store.state.createRecordError === null) {
      alert('以保存');
      this.record.notes = '';
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>
