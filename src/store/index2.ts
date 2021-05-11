import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

const store = {
  // record
  ...recordStore,
  // tag
  ...tagStore
};

console.log(store);

export default store;
