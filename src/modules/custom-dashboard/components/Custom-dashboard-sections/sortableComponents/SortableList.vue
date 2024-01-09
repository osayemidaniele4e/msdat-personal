<script>
// import { Sortable } from '@shopify/draggable';

function move(items, oldIndex, newIndex) {
  const itemRemovedArray = [
    ...items.slice(0, oldIndex),
    ...items.slice(oldIndex + 1, items.length),
  ];
  const SortedArrayList = [
    ...itemRemovedArray.slice(0, newIndex),
    items[oldIndex],
    ...itemRemovedArray.slice(newIndex, itemRemovedArray.length),
  ];

  return SortedArrayList;
}

export default {
  props: {
    value: {
      required: true,
    },
    itemClass: {
      default: 'sortable-item',
    },
    handleClass: {
      default: 'sortable-handle',
    },
  },
  render() {
    return this.$scopedSlots.default({
      items: this.value,

    });
  },
  mounted() {
    new Sortable(this.$el, {
      draggable: `.${this.itemClass}`,
      handle: `.${this.handleClass}`,
      mirror: {
        constrainDimensions: true,
      },
    }).on('sortable:stop', ({ oldIndex, newIndex }) => {
      const moveData = move(this.value, oldIndex, newIndex);
      this.$emit('input', moveData);
      this.$store.dispatch('arrangedSection', moveData);
    });
  },
};
</script>
