import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
  // record
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => {
    recordListModel.create(record);
  },

  // tag
  tagList: tagListModel.fetch(),
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      alert('已经有这个标签名了');
    } else if (message === 'success') {
      alert('添加成功');
    }
  },

  removeTag: (id: string) => {
    /*if (tagListModel.remove(id)) {
      return true;
    } else {
      return false;
    }*/
    return tagListModel.remove(id);
  },

  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  }
};

export default store;
