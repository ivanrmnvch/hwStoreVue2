<template>
  <section>
    {{ message }}
  </section>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'MessagePage',
  computed: {
    ...mapState('messagePage', [
      'message',
    ]),
  },
};
</script>
