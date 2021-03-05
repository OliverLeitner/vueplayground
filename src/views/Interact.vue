<template>
  <div class="interact">
    <InterAct />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import InterAct from '@/components/InterAct.vue';

@Options({
  name: 'Interact',
  components: {
    InterAct,
  },
})
export default class Interact extends Vue {}
</script>
