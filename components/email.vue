<template>
  <tr class="email" :class="email.read ? 'read' : 'unread'">
    <td>
      <input
        @click="$event.stopPropagation()"
        type="checkbox"
        :checked="isSelected(email)"
        @change="toggleSelect"
        class="email-checkbox"
        ref="checkboxRef"
      />
    </td>
    <td>
      <div class="email-body">{{ email.body }}</div>
    </td>
  </tr>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "eMail",
  props: { email: Object },
  methods: {
    ...mapMutations(["addSelectedEmail", "removeSelectedEmail"]),
    isSelected(email) {
      return this.$store.getters.isSelected(email);
    },
    toggleSelect() {
      if (this.isSelected(this.email)) {
        this.removeSelectedEmail(this.email);
      } else {
        this.addSelectedEmail(this.email);
      }
    },
  },
};
</script>

<style lang="scss"></style>
